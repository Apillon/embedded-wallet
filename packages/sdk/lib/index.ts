import { ethers } from 'ethers';
import {
  AccountWallet,
  AppParams,
  AuthData,
  AuthStrategyName,
  ContractReadParams,
  ContractWriteParams,
  Events,
  PlainTransactionParams,
  RegisterData,
  SignMessageParams,
  SignatureCallback,
  WebauthnContract,
} from './types';
import * as sapphire from '@oasisprotocol/sapphire-paratime';
import { AccountAbi, AccountManagerAbi } from './abi';
import PasswordStrategy from './strategies/password';
import PasskeyStrategy from './strategies/passkey';
import { networkIdIsSapphire, getHashedUsername, abort, JsonMultiRpcProvider } from './utils';
import mitt, { Emitter } from 'mitt';
import { SapphireMainnet, SapphireTestnet } from './constants';
import { WalletDisconnectedError } from './adapters/eip1193';
import { XdomainPasskey } from './xdomain';
import { XdomainIframe } from './xiframe';

class EmbeddedWallet {
  sapphireProvider: ethers.JsonRpcProvider;
  accountManagerContract: WebauthnContract;
  abiCoder = ethers.AbiCoder.defaultAbiCoder();
  events: Emitter<Events>;
  apillonClientId: string;
  xdomain?: XdomainPasskey;
  xiframe?: XdomainIframe;

  defaultNetworkId = 0;
  rpcUrls = {} as { [networkId: number]: string };
  rpcProviders = {} as { [networkId: number]: ethers.JsonRpcProvider };
  explorerUrls = {
    [SapphireMainnet]: 'https://explorer.oasis.io/mainnet/sapphire',
    [SapphireTestnet]: 'https://explorer.oasis.io/testnet/sapphire',
  } as { [networkId: number]: string };

  lastAccount = {
    contractAddress: '',
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

    this.accountManagerContract = new ethers.Contract(
      import.meta.env.VITE_ACCOUNT_MANAGER_ADDRESS ?? '0x50dE236a7ce372E7a09956087Fb4862CA1a887aA',
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

    if (!!params?.isPasskeyPopup) {
      this.xdomain = new XdomainPasskey();
    }

    if (!params?.noPasskeyIframe) {
      this.xiframe = new XdomainIframe(this.apillonClientId);
    }

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
   */
  async register(strategy: AuthStrategyName, authData: AuthData, hashedUsername?: Buffer) {
    if (!this.sapphireProvider) {
      abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
    }

    if (!this.accountManagerContract) {
      abort('ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED');
    }

    let registerData = undefined as RegisterData | undefined;

    /**
     * Authentication method
     */
    if (strategy === 'password') {
      registerData = await new PasswordStrategy().getRegisterData(authData);
    } else if (strategy === 'passkey') {
      registerData = await new PasskeyStrategy().getRegisterData(
        { ...authData, hashedUsername },
        !!this.xdomain
      );
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
      abort('CANT_GET_SIGNATURE');
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

    this.events.emit('dataUpdated', {
      name: 'authStrategy',
      newValue: strategy,
      oldValue: this.lastAccount.authStrategy,
    });

    this.lastAccount.authStrategy = strategy;

    if (await this.waitForTxReceipt(txHash)) {
      return await this.handleAccountAfterAuth(authData.username);
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

    const RANDOM_STRING = '0x000000000000000000000000000000000000000000000000000000000000DEAD';

    const hashedUsername = await getHashedUsername(authData.username);

    const AC = new ethers.Interface(AccountAbi);
    const data = AC.encodeFunctionData('sign', [RANDOM_STRING]);

    const loginData = await this.getProxyForStrategy(strategy, data, {
      ...authData,
      hashedUsername,
    });

    console.log(loginData);

    if (!loginData) {
      abort('NO_LOGIN_PROXY_DATA');
      return;
    }

    this.events.emit('dataUpdated', {
      name: 'authStrategy',
      newValue: strategy,
      oldValue: this.lastAccount.authStrategy,
    });

    this.lastAccount.authStrategy = strategy;

    /**
     * Get public key from credentials
     */
    const [[r, s, v]] = AC.decodeFunctionResult('sign', loginData!).toArray();
    const recoveredPublicKey = ethers.recoverAddress(RANDOM_STRING, {
      r,
      s,
      v,
    });

    /**
     * Get public key for username from account manager contract
     */
    const publicAddress = await this.getAccountAddress(authData.username);

    /**
     * If keys match -> Auth success, return account addresses
     */
    if (recoveredPublicKey === publicAddress) {
      return await this.handleAccountAfterAuth(authData.username);
    }
  }

  /**
   * Return public address for username.
   */
  async getAccountAddress(username?: string) {
    if (!this.sapphireProvider) {
      abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
      return;
    }

    if (!this.accountManagerContract) {
      abort('ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED');
      return;
    }

    if (!this.lastAccount.wallets.length) {
      await this.getAccountWallets();
    }

    if (!username) {
      if (this.lastAccount.wallets.length > this.lastAccount.walletIndex) {
        return this.lastAccount.wallets[this.lastAccount.walletIndex].address;
      }

      abort('NO_USERNAME');
      return;
    }

    if (this.lastAccount.wallets.length) {
      const found = this.lastAccount.wallets.findIndex(x => x.title === username);

      if (found > -1) {
        if (found !== this.lastAccount.walletIndex) {
          this.events.emit('dataUpdated', {
            name: 'walletIndex',
            newValue: found,
            oldValue: this.lastAccount.walletIndex,
          });
        }

        return this.lastAccount.wallets[found].address;
      }
    }
  }

  /**
   * Get all wallets added on user's account. Requires authentication.
   */
  async getAccountWallets(params: { strategy?: AuthStrategyName; authData?: AuthData } = {}) {
    if (!this.sapphireProvider) {
      abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
      return;
    }

    if (!this.accountManagerContract) {
      abort('ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED');
      return;
    }

    if (!params.authData?.username) {
      if (this.lastAccount.wallets.length) {
        return this.lastAccount.wallets;
      }

      abort('NO_USERNAME');
      return;
    }

    if (!params.authData) {
      if (
        params.strategy === 'passkey' &&
        this.lastAccount.wallets.length > this.lastAccount.walletIndex
      ) {
        params.authData = {
          username: this.lastAccount.wallets[this.lastAccount.walletIndex].title,
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
    }

    const AC = new ethers.Interface(AccountAbi);
    const data = AC.encodeFunctionData('getWalletList', []);

    const res = await this.getProxyForStrategy(
      this.lastAccount.authStrategy,
      data,
      params.authData!
    );

    if (res) {
      const [accountWallets] = AC.decodeFunctionResult('getWalletList', res).toArray();

      this.events.emit('dataUpdated', {
        name: 'wallets',
        newValue: accountWallets,
        oldValue: this.lastAccount.wallets,
      });

      this.lastAccount.wallets = accountWallets;

      return accountWallets as AccountWallet[];
    }
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

  async getAccountPrivateKey(params: { strategy?: AuthStrategyName; authData?: AuthData } = {}) {
    if (!this.sapphireProvider) {
      abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
    }

    if (!params.strategy) {
      params.strategy = this.lastAccount.authStrategy;
    }

    if (!params.authData) {
      if (
        params.strategy === 'passkey' &&
        this.lastAccount.wallets.length > this.lastAccount.walletIndex
      ) {
        params.authData = {
          username: this.lastAccount.wallets[this.lastAccount.walletIndex].title,
        };
      } else {
        abort('AUTHENTICATION_DATA_NOT_PROVIDED');
      }
    }

    const AC = new ethers.Interface(AccountAbi);
    const data = AC.encodeFunctionData('exportPrivateKey', []);

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

  setAccount(params: { walletIndex: number; strategy: AuthStrategyName; contractAddress: string }) {
    this.events.emit('dataUpdated', {
      name: 'walletIndex',
      newValue: params.walletIndex,
      oldValue: this.lastAccount.walletIndex,
    });

    this.events.emit('dataUpdated', {
      name: 'authStrategy',
      newValue: params.strategy,
      oldValue: this.lastAccount.authStrategy,
    });

    this.lastAccount.walletIndex = params.walletIndex;
    this.lastAccount.authStrategy = params.strategy;
    this.lastAccount.contractAddress = params.contractAddress;
  }

  async handleAccountAfterAuth(username: string) {
    const addr = await this.getAccountAddress(username);

    if (addr && this.waitForAccountResolver) {
      this.waitForAccountResolver(addr);
      this.waitForAccountResolver = null;
    }

    if (addr) {
      this.events.emit('accountsChanged', [addr]);
    }

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
      if (
        params.strategy === 'passkey' &&
        this.lastAccount.wallets.length > this.lastAccount.walletIndex
      ) {
        params.authData = {
          username: this.lastAccount.wallets[this.lastAccount.walletIndex].title,
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

      data = AC.encodeFunctionData('sign', [params.message]);

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
    const res = await this.getProxyForStrategy(
      params.strategy || this.lastAccount.authStrategy,
      data,
      params.authData!
    );

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

    if (!params.authData) {
      if (
        params.strategy === 'passkey' &&
        this.lastAccount.wallets.length > this.lastAccount.walletIndex
      ) {
        params.authData = {
          username: this.lastAccount.wallets[this.lastAccount.walletIndex].title,
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
    const data = AC.encodeFunctionData('signEIP155', [params.tx]);

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
    label = 'Transaction'
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
    };

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
   * Get signed tx for making a contract write call.
   */
  async signContractWrite(params: ContractWriteParams) {
    const chainId = this.validateChainId(params.chainId);

    await this.handleNetworkChange(chainId);

    if (!params.strategy) {
      params.strategy = this.lastAccount.authStrategy;
    }

    if (!params.authData) {
      if (
        params.strategy === 'passkey' &&
        this.lastAccount.wallets.length > this.lastAccount.walletIndex
      ) {
        params.authData = {
          username: this.lastAccount.wallets[this.lastAccount.walletIndex].title,
        };
      } else {
        abort('AUTHENTICATION_DATA_NOT_PROVIDED');
        return;
      }
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

    const accountAddress = await this.getAccountAddress(params.authData!.username);

    if (!accountAddress) {
      abort('CANT_GET_ACCOUNT_ADDRESS');
      return;
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
    const data = AC.encodeFunctionData('signEIP155', [tx]);
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
  // #endregion

  // #region Helpers
  /**
   * Helper for triggering different auth strategies
   */
  async getProxyForStrategy(strategy: AuthStrategyName, data: any, authData: AuthData) {
    if (!this.accountManagerContract) {
      abort('ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED');
    }

    if (strategy === 'password') {
      return await new PasswordStrategy().getProxyResponse(
        this.accountManagerContract,
        data,
        authData
      );
    } else if (strategy === 'passkey') {
      return await new PasskeyStrategy().getProxyResponse(
        this.accountManagerContract,
        data,
        authData,
        !!this.xdomain ? 'popup' : !!this.xiframe ? 'iframe' : 'default'
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
  // #endregion
}

export { EmbeddedWallet };
export default EmbeddedWallet;

declare global {
  interface Window {
    embeddedWallet: EmbeddedWallet;
  }
}
