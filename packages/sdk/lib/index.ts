import { ethers } from 'ethers';
import {
  AccountWallet,
  AccountWalletTypes,
  AppParams,
  AuthData,
  AuthStrategyName,
  ContractReadParams,
  ContractWriteParams,
  Events,
  GaslessTxType,
  PlainTransactionParams,
  RegisterData,
  SignMessageParams,
  SignatureCallback,
  TransactionItem,
  WebauthnContract,
} from './types';
import * as sapphire from '@oasisprotocol/sapphire-paratime';
import { AccountAbi, AccountManagerAbi } from './abi';
import PasswordStrategy from './strategies/password';
import PasskeyStrategy from './strategies/passkey';
import { networkIdIsSapphire, getHashedUsername, abort, JsonMultiRpcProvider } from './utils';
import mitt, { Emitter } from 'mitt';
import {
  ProxyWriteFunctionsByStrategy,
  SapphireMainnet,
  SapphireTestnet,
  WalletType,
} from './constants';
import { WalletDisconnectedError } from './adapters/eip1193';
import { XdomainPasskey } from './xdomain';

class EmbeddedWallet {
  sapphireProvider: ethers.JsonRpcProvider;
  accountManagerAddress: string;
  accountManagerContract: WebauthnContract;
  abiCoder = ethers.AbiCoder.defaultAbiCoder();
  events: Emitter<Events>;
  apillonClientId: string;
  xdomain?: XdomainPasskey;

  defaultNetworkId = 0;
  rpcUrls = {} as { [networkId: number]: string };
  rpcProviders = {} as { [networkId: number]: ethers.JsonRpcProvider };
  explorerUrls = {
    [SapphireMainnet]: 'https://explorer.oasis.io/mainnet/sapphire',
    [SapphireTestnet]: 'https://explorer.oasis.io/testnet/sapphire',
  } as { [networkId: number]: string };

  lastAccount = {
    contractAddress: '',
    username: '',
    authStrategy: 'passkey' as AuthStrategyName,
    wallets: [] as AccountWallet[],
    walletIndex: 0,
  };

  /**
   * Resolve on login/register if defined. This resolves EIP-1193 request.
   */
  waitForAccountResolver = null as null | ((address: string) => void);

  /**
   * Prepare sapphire provider and account manager (WebAuthn) contract.
   * Prepare data for available chains
   */
  constructor(params?: AppParams) {
    const ethSaphProvider = new JsonMultiRpcProvider([
      import.meta.env.VITE_SAPPHIRE_URL ?? 'https://sapphire.oasis.io',
      ...(import.meta.env.VITE_SAPPHIRE_BACKUP_URLS
        ? import.meta.env.VITE_SAPPHIRE_BACKUP_URLS.replace(/\s/g, '').split(',')
        : []),
    ]);

    this.sapphireProvider = sapphire.wrap(ethSaphProvider);
    this.accountManagerAddress =
      import.meta.env.VITE_ACCOUNT_MANAGER_ADDRESS ?? '0x50dE236a7ce372E7a09956087Fb4862CA1a887aA';

    this.accountManagerContract = new ethers.Contract(
      this.accountManagerAddress,
      AccountManagerAbi,
      new ethers.VoidSigner(ethers.ZeroAddress, this.sapphireProvider)
    ) as unknown as WebauthnContract;

    this.defaultNetworkId = params?.defaultNetworkId || this.defaultNetworkId;

    if (params?.networks) {
      for (const ntw of params.networks) {
        this.rpcUrls[ntw.id] = ntw.rpcUrl;
        this.explorerUrls[ntw.id] = ntw.explorerUrl;
      }
    }

    this.events = mitt<Events>();
    this.apillonClientId = params?.clientId || '';

    this.xdomain = new XdomainPasskey(this.apillonClientId, params?.passkeyAuthMode);

    /**
     * Provider connection events
     */
    try {
      if (this.getRpcProviderForChainId(this.defaultNetworkId)) {
        this.events.emit('connect', { chainId: `0x${this.defaultNetworkId.toString(16)}` });
      }
    } catch (_e) {
      /* empty */
    }
  }

  // #region Auth utils
  /**
   * Check if `username` is already registered on accountManager
   */
  async userExists(username: string) {
    if (!this.sapphireProvider) {
      abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
    }

    if (!this.accountManagerContract) {
      abort('ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED');
    }

    const res = await this.accountManagerContract.userExists(
      (await getHashedUsername(username)) as any
    );

    return res || false;
  }

  /**
   * Create new "wallet" for username.
   * Creates a new contract for each account on sapphire network.
   *
   * @param skipAccountWallets  Dont make another request for listing the wallets on account
   */
  async register(
    strategy: AuthStrategyName,
    authData: AuthData,
    hashedUsername?: Buffer,
    skipAccountWallets = false
  ) {
    if (!this.sapphireProvider) {
      return abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
    }

    if (!this.accountManagerContract) {
      return abort('ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED');
    }

    let registerData = undefined as RegisterData | undefined;

    /**
     * Authentication method
     */
    if (strategy === 'password') {
      registerData = await new PasswordStrategy(this).getRegisterData(authData);
    } else if (strategy === 'passkey') {
      registerData = await new PasskeyStrategy(this).getRegisterData({
        ...authData,
        hashedUsername,
      });
    }

    const gaslessData = this.abiCoder.encode(
      ['tuple(bytes funcData, uint8 txType)'],
      [
        {
          funcData: this.abiCoder.encode(
            [
              'tuple(bytes32 hashedUsername, bytes credentialId, tuple(uint8 kty, int8 alg, uint8 crv, uint256 x, uint256 y) pubkey, bytes32 optionalPassword, tuple(uint8 walletType, bytes32 keypairSecret, string title) wallet)',
            ],
            [registerData]
          ),
          txType: 0,
        },
      ]
    );

    const gasPrice = (await this.sapphireProvider.getFeeData()).gasPrice;
    const nonce = await this.sapphireProvider.getTransactionCount(
      await this.accountManagerContract.gaspayingAddress()
    );

    // Get signature from API (handle gas payments e.g.)
    const gaslessParams = await this.getApillonSignature(gaslessData);

    if (!gaslessParams.signature) {
      return abort('CANT_GET_SIGNATURE');
    }

    const signedTx = await this.accountManagerContract.generateGaslessTx(
      gaslessData,
      nonce as any,
      gaslessParams.gasPrice ? BigInt(gaslessParams.gasPrice) : (gasPrice as any),
      gaslessParams.gasLimit ? BigInt(gaslessParams.gasLimit) : 1_000_000n,
      BigInt(gaslessParams.timestamp),
      gaslessParams.signature
    );

    const txHash = await this.sapphireProvider.send('eth_sendRawTransaction', [signedTx]);

    if (await this.waitForTxReceipt(txHash)) {
      if (skipAccountWallets) {
        return '';
      }

      return await this.finalizeAccountAuth(strategy, authData);
    }
  }

  /**
   * Check that credentials belong to some account.
   */
  async authenticate(strategy: AuthStrategyName, authData: AuthData) {
    if (!this.sapphireProvider) {
      abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
      return;
    }

    if (!this.accountManagerContract) {
      abort('ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED');
      return;
    }

    if (!authData.username) {
      abort('NO_USERNAME');
      return;
    }

    await this.getAccountWallets({ authData, strategy, reload: true });

    return await this.finalizeAccountAuth(strategy, authData);
  }

  /**
   * Return public address for username.
   */
  async getAccountAddress(strategy?: AuthStrategyName, authData?: AuthData) {
    if (!this.sapphireProvider) {
      abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
      return;
    }

    if (!this.accountManagerContract) {
      abort('ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED');
      return;
    }

    if (!this.lastAccount.wallets.length) {
      await this.getAccountWallets({ authData, strategy });
    }

    if (!authData?.username) {
      if (this.lastAccount.wallets.length > this.lastAccount.walletIndex) {
        return this.lastAccount.wallets[this.lastAccount.walletIndex].address;
      }

      abort('NO_USERNAME');
      return;
    }

    if (this.lastAccount.wallets.length) {
      if (this.lastAccount.wallets.length > this.lastAccount.walletIndex) {
        return this.lastAccount.wallets[this.lastAccount.walletIndex].address;
      } else {
        this.events.emit('dataUpdated', {
          name: 'walletIndex',
          newValue: 0,
          oldValue: this.lastAccount.walletIndex,
        });

        this.lastAccount.walletIndex = 0;

        return this.lastAccount.wallets[this.lastAccount.walletIndex].address;
      }
    }

    abort('CANT_GET_ACCOUNT_ADDRESS');
  }

  async getAccountBalance(address: string, networkId = this.defaultNetworkId, decimals = 18) {
    if (!networkId || (!this.rpcUrls[networkId] && networkIdIsSapphire(networkId))) {
      return ethers.formatUnits((await this.sapphireProvider?.getBalance(address)) || 0n, decimals);
    }

    if (!this.rpcUrls[networkId]) {
      return '0';
    }

    const ethProvider =
      this.rpcProviders[networkId] || new ethers.JsonRpcProvider(this.rpcUrls[networkId]);

    return ethers.formatUnits(await ethProvider.getBalance(address), decimals);
  }

  async getAccountPrivateKey(
    params: { strategy?: AuthStrategyName; authData?: AuthData; walletIndex?: number } = {}
  ) {
    if (!this.sapphireProvider) {
      abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
    }

    if (!params.strategy) {
      params.strategy = this.lastAccount.authStrategy;
    }

    if (!params.authData) {
      if (params.strategy === 'passkey' && this.lastAccount.username) {
        params.authData = {
          username: this.lastAccount.username,
        };
      } else {
        abort('AUTHENTICATION_DATA_NOT_PROVIDED');
      }
    }

    const AC = new ethers.Interface(AccountAbi);
    const data = AC.encodeFunctionData('exportPrivateKey', [
      params.walletIndex || this.lastAccount.walletIndex,
    ]);

    /**
     * Authenticate user and sign message
     */
    const res = await this.getProxyForStrategy(
      params.strategy || this.lastAccount.authStrategy,
      data,
      params.authData!
    );

    if (res) {
      const [exportedPrivateKey] = AC.decodeFunctionResult('exportPrivateKey', res).toArray();
      return exportedPrivateKey as string;
    }
  }
  // #endregion

  // #region Account wallets
  /**
   * Get all wallets added on user's account. Requires authentication.
   * @param reload Ignore cache and get wallets from contract again
   */
  async getAccountWallets(
    params: { strategy?: AuthStrategyName; authData?: AuthData; reload?: boolean } = {}
  ) {
    if (!this.sapphireProvider) {
      abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
      return;
    }

    if (!this.accountManagerContract) {
      abort('ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED');
      return;
    }

    if (!params.reload && this.lastAccount.wallets.length) {
      return this.lastAccount.wallets;
    }

    if (!params.strategy) {
      params.strategy = this.lastAccount.authStrategy;
    }

    if (!params.authData || !params.authData.username) {
      if (params.strategy === 'passkey' && this.lastAccount.username) {
        params.authData = {
          username: this.lastAccount.username,
        };
      } else {
        abort('AUTHENTICATION_DATA_NOT_PROVIDED');
        return;
      }
    }

    if (!this.lastAccount.contractAddress) {
      const hashedUsername = await getHashedUsername(params.authData.username);
      this.lastAccount.contractAddress = (await this.accountManagerContract.getAccount(
        hashedUsername as any
      )) as string;

      this.events.emit('dataUpdated', {
        name: 'contractAddress',
        newValue: this.lastAccount.contractAddress,
        oldValue: '',
      });
    }

    const AC = new ethers.Interface(AccountAbi);
    const data = AC.encodeFunctionData('getWalletList', []);

    const res = await this.getProxyForStrategy(params.strategy, data, params.authData!);

    if (res) {
      const [accountWallets] = AC.decodeFunctionResult('getWalletList', res).toArray();

      if (Array.isArray(accountWallets) && accountWallets.length) {
        const mapped = accountWallets
          .map((x, index) =>
            Array.isArray(x) && x.length >= 3
              ? ({
                  walletType: +(x[0] as bigint).toString(),
                  address: x[1],
                  index,
                } as AccountWallet)
              : undefined
          )
          .filter(x => !!x);

        this.events.emit('dataUpdated', {
          name: 'wallets',
          newValue: mapped,
          oldValue: this.lastAccount.wallets,
        });

        this.lastAccount.wallets = mapped;

        return mapped as AccountWallet[];
      }

      abort('CANT_GET_ACCOUNT_WALLETS');
    }
  }

  /**
   * Add new wallet or import from privateKey.
   * Returns tx hash on success.
   */
  async addAccountWallet(params: {
    walletType?: AccountWalletTypes;
    privateKey?: string;
    authData?: AuthData;
    strategy?: AuthStrategyName;
  }) {
    if (!this.sapphireProvider) {
      abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
      return;
    }

    if (!this.accountManagerContract) {
      abort('ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED');
      return;
    }

    if (!params.strategy) {
      params.strategy = this.lastAccount.authStrategy;
    }

    if (!params.walletType) {
      params.walletType = WalletType.EVM;
    }

    if (!params.authData) {
      if (params.strategy === 'passkey' && this.lastAccount.username) {
        params.authData = {
          username: this.lastAccount.username,
        };
      } else {
        abort('AUTHENTICATION_DATA_NOT_PROVIDED');
        return;
      }
    }

    /**
     * @TODO Remove title (when contract updates)
     */
    const data = this.abiCoder.encode(
      ['tuple(uint256 walletType, bytes32 keypairSecret, string title)'],
      [
        {
          walletType: params.walletType,
          keypairSecret: params.privateKey || ethers.ZeroHash,
          title: '',
        },
      ]
    );

    // const res = await this.proxyWriteForStrategy(
    //   params.strategy,
    //   'addWallet',
    //   data,
    //   params.authData,
    //   'Add new account'
    // );

    let txType = GaslessTxType.AddWallet;
    let funcDataTypes = '';

    if (params.strategy === 'passkey') {
      txType = GaslessTxType.AddWallet;
      funcDataTypes =
        'tuple(bytes32 credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) resp, bytes data)';
    } else if (params.strategy === 'password') {
      txType = GaslessTxType.AddWalletPassword;
      funcDataTypes = 'tuple(bytes32 hashedUsername, bytes32 digest, bytes data)';
    }

    const res = await this.processGaslessMethod({
      label: 'Add new account',
      strategy: params.strategy,
      authData: params.authData,
      data,
      txType,
      funcDataTypes,
      funcDataValuesFormatter(p) {
        if (p.credentials.passkey) {
          return {
            ...p.credentials.passkey,
            data,
          };
        } else if (p.credentials.password) {
          return {
            hashedUsername: p.hashedUsername,
            digest: p.credentials.password,
            data,
          };
        }

        return {};
      },
    });

    if (res) {
      return res as string;
    }

    abort('CANT_GET_WALLET_ADDRESS');
  }
  // #endregion

  // #region Auth helpers
  /**
   * Handler for getting signature.
   *
   * The request is limited to whitelisted domains determined by client integration ID.
   */
  async getApillonSignature(
    gaslessData: Parameters<SignatureCallback>[0]
  ): ReturnType<SignatureCallback> {
    if (!this.apillonClientId) {
      abort('NO_APILLON_CLIENT_ID');
      return { signature: '', gasLimit: 0, timestamp: 0 };
    }

    try {
      const { data } = await (
        await fetch(
          `${import.meta.env.VITE_APILLON_BASE_URL ?? 'https://api.apillon.io'}/embedded-wallet/signature`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              data: gaslessData,
              integration_uuid: this.apillonClientId,
            }),
          }
        )
      ).json();

      return {
        signature: data.signature,
        gasLimit: data.gasLimit || 0,
        gasPrice: data.gasPrice || 0,
        timestamp: data.timestamp,
      };
    } catch (e) {
      console.error('Signature request error', e);
    }

    return { signature: '', gasLimit: 0, timestamp: 0 };
  }

  setAccount(params: {
    username?: string;
    walletIndex?: number;
    strategy?: AuthStrategyName;
    contractAddress?: string;
    wallets?: AccountWallet[];
  }) {
    if (typeof params.username !== 'undefined' && params.username !== this.lastAccount.username) {
      this.events.emit('dataUpdated', {
        name: 'username',
        newValue: params.username,
        oldValue: this.lastAccount.username,
      });
      this.lastAccount.username = params.username;
    }

    if (
      typeof params.walletIndex !== 'undefined' &&
      params.walletIndex >= 0 &&
      params.walletIndex !== this.lastAccount.walletIndex
    ) {
      this.events.emit('dataUpdated', {
        name: 'walletIndex',
        newValue: params.walletIndex,
        oldValue: this.lastAccount.walletIndex,
      });
      this.lastAccount.walletIndex = params.walletIndex;
    }

    if (
      typeof params.strategy !== 'undefined' &&
      params.strategy !== this.lastAccount.authStrategy
    ) {
      this.events.emit('dataUpdated', {
        name: 'authStrategy',
        newValue: params.strategy,
        oldValue: this.lastAccount.authStrategy,
      });
      this.lastAccount.authStrategy = params.strategy;
    }

    if (
      typeof params.contractAddress !== 'undefined' &&
      params.contractAddress !== this.lastAccount.contractAddress
    ) {
      this.events.emit('dataUpdated', {
        name: 'authStrategy',
        newValue: params.contractAddress,
        oldValue: this.lastAccount.contractAddress,
      });

      this.lastAccount.contractAddress = params.contractAddress;
    }

    if (
      Array.isArray(params.wallets) &&
      params.wallets.length !== this.lastAccount.wallets.length
    ) {
      this.events.emit('dataUpdated', {
        name: 'wallets',
        newValue: params.wallets,
        oldValue: this.lastAccount.wallets,
      });

      this.lastAccount.wallets = [...params.wallets];
    }
  }

  setWallets(wallets: AccountWallet[]) {
    this.events.emit('dataUpdated', {
      name: 'wallets',
      newValue: wallets,
      oldValue: this.lastAccount.wallets,
    });

    this.lastAccount.wallets = wallets;
  }

  /**
   * Get a wallet address for account and pass it to listeners.
   * Update the stored lastAccount.
   * This process includes getting all wallets (getAccountWallets) which requires authentication (when no cache is available).
   */
  async finalizeAccountAuth(strategy: AuthStrategyName, authData: AuthData) {
    const addr = await this.getAccountAddress(strategy, authData);

    if (addr && this.waitForAccountResolver) {
      this.waitForAccountResolver(addr);
      this.waitForAccountResolver = null;
    }

    if (addr) {
      this.events.emit('accountsChanged', [addr]);
    }

    this.events.emit('dataUpdated', {
      name: 'authStrategy',
      newValue: strategy,
      oldValue: this.lastAccount.authStrategy,
    });
    this.events.emit('dataUpdated', {
      name: 'username',
      newValue: authData.username,
      oldValue: this.lastAccount.username,
    });

    this.lastAccount.authStrategy = strategy;
    this.lastAccount.username = authData.username;

    return addr;
  }

  /**
   * Create a promise and pass resolver to event `providerRequestAccounts`.
   * Once the promise resolves, return account address.
   */
  async waitForAccount() {
    return await new Promise<string>(resolve => {
      this.waitForAccountResolver = resolve;
      this.events.emit('providerRequestAccounts', resolve);
    });
  }
  // #endregion

  // #region Transactions
  async signMessage(params: SignMessageParams) {
    if (!this.sapphireProvider) {
      abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
    }

    if (!params.strategy) {
      params.strategy = this.lastAccount.authStrategy;
    }

    if (!params.authData) {
      if (params.strategy === 'passkey' && this.lastAccount.username) {
        params.authData = {
          username: this.lastAccount.username,
        };
      } else {
        abort('AUTHENTICATION_DATA_NOT_PROVIDED');
      }
    }

    const AC = new ethers.Interface(AccountAbi);

    let data = params.data || '';
    const originalMessage = params.message;

    if (!data || params.mustConfirm) {
      // maybe check if msg.length !== 66
      if (typeof params.message === 'string' && !params.message.startsWith('0x')) {
        params.message = ethers.hashMessage(params.message);
      }

      data = AC.encodeFunctionData('sign', [
        params.walletIndex || this.lastAccount.walletIndex,
        params.message,
      ]);

      /**
       * Emits 'signatureRequest' if confirmation is needed.
       * Handle confirmation in UI part of app (call this method again w/o `mustConfirm`).
       */
      if (params.mustConfirm) {
        return await new Promise<string>((resolve, reject) => {
          this.events.emit('signatureRequest', {
            ...params,
            data,
            message: originalMessage,
            mustConfirm: false,
            resolve,
            reject,
          });
        });
      }
    }

    /**
     * Authenticate user and sign message
     */
    const res = await this.getProxyForStrategy(params.strategy, data, params.authData!);

    if (res) {
      const [signedRSV] = AC.decodeFunctionResult('sign', res).toArray();

      if (Array.isArray(signedRSV) && signedRSV.length > 2) {
        const signedMsg = ethers.Signature.from({
          r: signedRSV[0],
          s: signedRSV[1],
          v: signedRSV[2],
        }).serialized;

        if (params.resolve) {
          params.resolve(signedMsg);
        }

        return signedMsg;
      }
    }
  }

  /**
   * Authenticate with selected auth strategy through sapphire "Account Manager",
   * then return signed tx data and chainId of tx.
   */
  async signPlainTransaction(params: PlainTransactionParams) {
    const chainId = this.validateChainId(
      params?.tx?.chainId ? +params.tx.chainId.toString() || 0 : 0
    );

    await this.handleNetworkChange(chainId);

    params.tx.chainId = chainId;

    if (!params.strategy) {
      params.strategy = this.lastAccount.authStrategy;
    }

    if (!params.walletIndex) {
      params.walletIndex = this.lastAccount.walletIndex;
    }

    if (!params.authData) {
      if (params.strategy === 'passkey' && this.lastAccount.username) {
        params.authData = {
          username: this.lastAccount.username,
        };
      } else {
        return abort('AUTHENTICATION_DATA_NOT_PROVIDED');
      }
    }

    // Data must be BytesLike
    if (!params.tx.data) {
      params.tx.data = '0x';
    }

    /**
     * Get nonce if none provided
     */
    if (!params.tx.nonce) {
      params.tx.nonce = await this.getRpcProviderForChainId(chainId).getTransactionCount(
        this.lastAccount.wallets[this.lastAccount.walletIndex].address
      );
    }

    /**
     * Change viem specific properties to ethers spec
     */
    if ((params.tx.type as any) === 'eip1559') {
      params.tx.type = 2;
      params.tx.gasLimit = (params.tx as any).gas;
    }

    /**
     * Calculate gasPrice if missing
     */
    if (!params.tx.gasPrice) {
      const feeData = await this.getRpcProviderForChainId(params.tx.chainId).getFeeData();

      params.tx.gasPrice = feeData.gasPrice;

      if (feeData.maxPriorityFeePerGas) {
        params.tx.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
      }

      if (feeData.maxFeePerGas) {
        params.tx.maxFeePerGas = feeData.maxFeePerGas;
      } else {
        params.tx.maxFeePerGas =
          BigInt(feeData.gasPrice || 0) * BigInt(2) + (feeData.maxPriorityFeePerGas || 0n);
      }
    }

    if (!params.tx.gasLimit) {
      const gas = await this.getRpcProviderForChainId(params.tx.chainId).estimateGas(params.tx);
      params.tx.gasLimit = !!gas ? Math.floor(Number(gas) * 1.01) : 1_000_000;
    }

    /**
     * Set value to bigint to avoid contract type errors
     *
     * - When write tx doesnt have value
     * - When value is set but is `undefined`
     */
    if (
      (params.tx.type === 2 && !params.tx.value) ||
      ('value' in params.tx && (typeof params.tx.value === 'undefined' || params.tx.value === null))
    ) {
      params.tx.value = 0n;
    }

    /**
     * Emit 'txApprove' if confirmation is needed.
     * Handle confirmation in UI part of app (call this method again w/o `mustConfirm`).
     */
    if (params.mustConfirm) {
      return await new Promise<{
        signedTxData: string;
        chainId?: number;
      }>((resolve, reject) => {
        this.events.emit('txApprove', {
          plain: { ...params, mustConfirm: false, resolve, reject },
        });
      });
    }

    const AC = new ethers.Interface(AccountAbi);
    const data = AC.encodeFunctionData('signEIP155', [
      params.walletIndex || this.lastAccount.walletIndex,
      params.tx,
    ]);

    /**
     * Authenticate user and sign transaction
     */
    const res = await this.getProxyForStrategy(params.strategy, data, params.authData!);

    if (res) {
      const [signedTxData] = AC.decodeFunctionResult('signEIP155', res).toArray();

      if (params.resolve) {
        params.resolve({
          signedTxData,
          chainId,
        });
      }

      return {
        signedTxData,
        chainId,
      };
    }
  }

  /**
   * Send raw transaction data to network.
   * If chainId is provided, the transaction is sent to that network (cross-chain).
   */
  async broadcastTransaction(
    signedTxData: ethers.BytesLike,
    chainId?: number,
    label = 'Transaction',
    internalLabel?: string
  ) {
    /**
     * Broadcast transaction
     */
    const ethProvider = this.getRpcProviderForChainId(chainId);
    const txHash = await ethProvider.send('eth_sendRawTransaction', [signedTxData]);

    const txItem = {
      hash: txHash,
      label,
      rawData: signedTxData,
      owner: this.lastAccount.wallets[this.lastAccount.walletIndex].address || 'none',
      status: 'pending' as const,
      chainId: chainId || this.defaultNetworkId,
      explorerUrl: this.explorerUrls[chainId || this.defaultNetworkId]
        ? `${this.explorerUrls[chainId || this.defaultNetworkId]}/tx/${txHash}`
        : '',
      createdAt: Date.now(),
      internalLabel,
    } as TransactionItem;

    this.events.emit('txSubmitted', txItem);

    return {
      txHash,
      ethProvider,
      txItem,
    };

    // const receipt = await this.waitForTxReceipt(txHash, ethProvider);
    // console.log(receipt);
    // return receipt;
  }

  /**
   * Prepare tx and emit `txSubmitted` event (to show tx in tx history in UI e.g.)
   */
  submitTransaction(
    txHash: string,
    signedTxData?: ethers.BytesLike,
    chainId?: number,
    label = 'Transaction',
    internalLabel?: string
  ) {
    const txItem = {
      hash: txHash,
      label,
      rawData: signedTxData || '',
      owner: this.lastAccount.wallets[this.lastAccount.walletIndex].address || 'none',
      status: 'pending' as const,
      chainId: chainId || this.defaultNetworkId,
      explorerUrl: this.explorerUrls[chainId || this.defaultNetworkId]
        ? `${this.explorerUrls[chainId || this.defaultNetworkId]}/tx/${txHash}`
        : '',
      createdAt: Date.now(),
      internalLabel,
    } as TransactionItem;

    this.events.emit('txSubmitted', txItem);

    return txItem;
  }

  /**
   * Get signed tx for making a contract write call.
   */
  async signContractWrite(params: ContractWriteParams) {
    const chainId = this.validateChainId(params.chainId);

    await this.handleNetworkChange(chainId);

    if (!params.strategy) {
      params.strategy = this.lastAccount.authStrategy;
    }

    if (!params.walletIndex) {
      params.walletIndex = this.lastAccount.walletIndex;
    }

    if (!params.authData) {
      if (params.strategy === 'passkey' && this.lastAccount.username) {
        params.authData = {
          username: this.lastAccount.username,
        };
      } else {
        abort('AUTHENTICATION_DATA_NOT_PROVIDED');
        return;
      }
    }

    const accountAddress = this.lastAccount.wallets[params.walletIndex]?.address;

    if (!accountAddress) {
      abort('CANT_GET_ACCOUNT_ADDRESS');
      return;
    }

    /**
     * Emit 'txApprove' if confirmation is needed.
     * Handle confirmation in UI part of app (call this method again w/o `mustConfirm`).
     */
    if (params.mustConfirm) {
      return await new Promise<{
        signedTxData: string;
        chainId?: number;
      }>((resolve, reject) => {
        this.events.emit('txApprove', {
          contractWrite: { ...params, mustConfirm: false, resolve, reject },
        });
      });
    }

    /**
     * Encode contract data
     */
    const contractInterface = new ethers.Interface(params.contractAbi);

    const contractData = contractInterface.encodeFunctionData(
      params.contractFunctionName,
      params.contractFunctionValues
    );

    /**
     * Prepare transaction
     */
    const tx = await new ethers.VoidSigner(
      accountAddress,
      this.getRpcProviderForChainId(chainId)
    ).populateTransaction({
      from: accountAddress,
      to: params.contractAddress,
      value: 0,
      data: contractData,
    });

    if (!tx.gasPrice) {
      const feeData = await this.getRpcProviderForChainId(params.chainId).getFeeData();
      tx.gasPrice = feeData.gasPrice || 20_000_000_000;

      if (feeData.maxPriorityFeePerGas) {
        tx.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
      }

      if (feeData.maxFeePerGas) {
        tx.maxFeePerGas = feeData.maxFeePerGas;
      } else {
        tx.maxFeePerGas =
          BigInt(feeData.gasPrice || 0) * BigInt(2) + (feeData.maxPriorityFeePerGas || 0n);
      }
    }

    if (!tx.gasLimit) {
      const gas = await this.getRpcProviderForChainId(params.chainId).estimateGas(tx);
      tx.gasLimit = !!gas ? Math.floor(Number(gas) * 1.01) : 1_000_000;
    }

    /**
     * Encode tx data and authenticate it with selected auth strategy through sapphire "Account Manager"
     */
    const AC = new ethers.Interface(AccountAbi);
    const data = AC.encodeFunctionData('signEIP155', [params.walletIndex, tx]);
    const res = await this.getProxyForStrategy(params.strategy, data, params.authData!);

    if (res) {
      const [signedTxData] = AC.decodeFunctionResult('signEIP155', res).toArray();

      if (params.resolve) {
        params.resolve({
          signedTxData,
          chainId,
        });
      }

      return {
        signedTxData,
        chainId,
      };
    }
  }

  /**
   * Get result of contract read.
   * Utility function, this has nothing to do with Oasis.
   */
  async contractRead(params: ContractReadParams) {
    const chainId = this.validateChainId(params.chainId);
    const ethProvider = this.getRpcProviderForChainId(chainId);

    await this.handleNetworkChange(chainId);

    const contract = new ethers.Contract(params.contractAddress, params.contractAbi, ethProvider);

    if (params.contractFunctionValues) {
      return await contract[params.contractFunctionName](...params.contractFunctionValues);
    } else {
      return await contract[params.contractFunctionName]();
    }
  }

  /**
   * Call an `Account Manager` contract method with a gasless transaction.
   * This means that app owner (clientId) pays for the transaction fees instead of user.
   * These methods must be supported by `generateGaslessTx` method on the contract.
   * Supported methods are defined by `GaslessTxType`.
   * About
   * - get & confirm credentials
   * - calculate and format tx data (according to `funcDataTypes` and `funcDataValuesFormatter` params)
   * - broadcast the tx (marked with `label` from params)
   */
  async processGaslessMethod(params: {
    strategy: AuthStrategyName;
    authData: AuthData;
    data: any;
    txType: GaslessTxType;
    funcDataTypes: string;
    funcDataValuesFormatter(p: {
      credentials: {
        passkey: Awaited<ReturnType<InstanceType<typeof PasskeyStrategy>['getPasskeyForMode']>>;
        password: Awaited<ReturnType<InstanceType<typeof PasswordStrategy>['getCredentials']>>;
      };
      hashedUsername: Buffer;
    }): any;
    label?: string;
    internalLabel?: string;
  }) {
    if (!this.sapphireProvider) {
      return abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
    }

    if (!this.accountManagerContract) {
      return abort('ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED');
    }

    if (!params.authData.hashedUsername) {
      params.authData.hashedUsername = await getHashedUsername(params.authData.username);
    }

    if (!params.authData.hashedUsername) {
      abort('CANT_HASH_USERNAME');
      return;
    }

    // Get credentials
    const credentials = {
      [params.strategy]: await this.getCredentialsForStrategy(
        params.strategy,
        params.data,
        params.authData
      ),
    } as any;

    // Format gaslessData
    const funcDataValues = params.funcDataValuesFormatter({
      credentials,
      hashedUsername: params.authData.hashedUsername,
    });

    const gaslessData = this.abiCoder.encode(
      ['tuple(bytes funcData, uint8 txType)'],
      [
        {
          funcData: this.abiCoder.encode([params.funcDataTypes], [funcDataValues]),
          txType: params.txType,
        },
      ]
    );

    // Calculate tx params
    const gasPrice = (await this.sapphireProvider.getFeeData()).gasPrice;
    const nonce = await this.sapphireProvider.getTransactionCount(
      await this.accountManagerContract.gaspayingAddress()
    );

    // Get signature from API (handle gas payments e.g.)
    const gaslessParams = await this.getApillonSignature(gaslessData);

    if (!gaslessParams.signature) {
      return abort('CANT_GET_SIGNATURE');
    }

    // Invoke contract method to get plain tx data
    const signedTx = await this.accountManagerContract.generateGaslessTx(
      gaslessData,
      nonce as any,
      gaslessParams.gasPrice ? BigInt(gaslessParams.gasPrice) : (gasPrice as any),
      gaslessParams.gasLimit ? BigInt(gaslessParams.gasLimit) : 1_000_000n,
      BigInt(gaslessParams.timestamp),
      gaslessParams.signature
    );

    const res = await this.broadcastTransaction(
      signedTx,
      undefined,
      params.label || 'Gasless Transaction',
      params.internalLabel || `gasless_${params.txType}`
    );

    if (res.txHash) {
      return res.txHash;
    }
  }
  // #endregion

  // #region Helpers
  /**
   * Helper for triggering different auth strategies
   */
  async getProxyForStrategy(
    strategy: AuthStrategyName,
    data: any,
    authData: AuthData
  ): Promise<any> {
    if (!this.accountManagerContract) {
      abort('ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED');
    }

    if (strategy === 'password') {
      return await new PasswordStrategy(this).getProxyResponse(data, authData);
    } else if (strategy === 'passkey') {
      return await new PasskeyStrategy(this).getProxyResponse(data, authData);
    }
  }

  /**
   * Use signContractWrite to invoke an account manager method and broadcast the tx
   * @returns txHash | undefined
   */
  async proxyWriteForStrategy(
    strategy: AuthStrategyName,
    functionName: keyof typeof ProxyWriteFunctionsByStrategy,
    data: any,
    authData: AuthData,
    txLabel?: string,
    dontWait = false
  ): Promise<any> {
    if (!this.accountManagerContract) {
      abort('ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED');
    }

    const functionNameForStrategy = ProxyWriteFunctionsByStrategy[functionName][strategy];

    if (strategy === 'password') {
      return await new PasswordStrategy(this).proxyWrite(
        functionNameForStrategy,
        data,
        authData,
        txLabel,
        dontWait
      );
    } else if (strategy === 'passkey') {
      return await new PasskeyStrategy(this).proxyWrite(
        functionNameForStrategy,
        data,
        authData,
        txLabel,
        dontWait
      );
    }
  }

  async getCredentialsForStrategy(strategy: AuthStrategyName, data: any, authData: AuthData) {
    const hashedUsername = authData.hashedUsername || (await getHashedUsername(authData.username));

    if (strategy === 'password') {
      return await new PasswordStrategy(this).getCredentials(data, { ...authData, hashedUsername });
    } else if (strategy === 'passkey') {
      return await new PasskeyStrategy(this).getPasskeyForMode(
        this?.xdomain?.mode || 'standalone',
        hashedUsername!,
        data
      );
    }
  }

  /**
   * Helper for waiting for tx receipt
   */
  async waitForTxReceipt(txHash: string, provider?: ethers.JsonRpcProvider) {
    if (!provider && !this.sapphireProvider) {
      abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
    }

    const maxRetries = 60;
    let retries = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const tr = await (provider || this.sapphireProvider).getTransactionReceipt(txHash);

      if (tr) {
        return tr;
      }

      retries += 1;

      if (retries >= maxRetries) {
        return;
      }

      await new Promise(f => setTimeout(f, 1000));
    }
  }

  setDefaultNetworkId(networkId: number) {
    if (this.rpcUrls[networkId] || networkId === SapphireMainnet || networkId === SapphireTestnet) {
      this.events.emit('dataUpdated', {
        name: 'defaultNetworkId',
        newValue: networkId,
        oldValue: this.defaultNetworkId,
      });

      this.events.emit('chainChanged', { chainId: `0x${networkId.toString(16)}` });

      this.defaultNetworkId = networkId;

      return true;
    }

    return false;
  }

  /**
   * Send event requestChainChange, wait for it to resolve.
   * Throws error if chain was not changed.
   */
  async handleNetworkChange(chainId?: number) {
    if (chainId && chainId !== this.defaultNetworkId) {
      const isChanged = await new Promise(resolve =>
        this.events.emit('requestChainChange', { chainId, resolve })
      );

      if (!isChanged) {
        return abort('CHAIN_CHANGE_FAILED');
      }

      this.setDefaultNetworkId(chainId);
    }
  }

  /**
   * Check if rpc is configured for desired network ID.
   */
  validateChainId(chainId?: number) {
    if (chainId && !networkIdIsSapphire(chainId) && !this.rpcUrls[chainId]) {
      abort('NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID');
    } else if (!chainId && !!this.defaultNetworkId && !this.rpcUrls[this.defaultNetworkId]) {
      abort('NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID');
    }

    /**
     * If no chain specified use default from app params
     */
    if (!chainId && !!this.defaultNetworkId) {
      chainId = this.defaultNetworkId;
    }

    return chainId;
  }

  /**
   * Get provider object for chainId.
   * If no chainId specified, use sapphire network rpc.
   */
  getRpcProviderForChainId(chainId?: number) {
    if (
      !chainId ||
      (chainId && !this.rpcUrls[chainId] && !!networkIdIsSapphire(+chainId.toString()))
    ) {
      /**
       * On sapphire network, use sapphire provider
       */
      if (!this.sapphireProvider) {
        this.events.emit('disconnect', { error: new WalletDisconnectedError() });
        abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
      }

      return this.sapphireProvider;
    } else {
      /**
       * On another network, use a provider for that chain
       */
      const ethProvider =
        this.rpcProviders[chainId] || new ethers.JsonRpcProvider(this.rpcUrls[chainId]);

      this.rpcProviders[chainId] = ethProvider;

      if (!ethProvider) {
        abort('CROSS_CHAIN_PROVIDER_NOT_INITIALIZED');
      }

      return ethProvider;
    }
  }

  getGaspayingAddress() {
    return this.accountManagerContract.gaspayingAddress();
  }
  // #endregion
}

export { EmbeddedWallet };
export default EmbeddedWallet;

declare global {
  interface Window {
    embeddedWallet: EmbeddedWallet;
  }
}
