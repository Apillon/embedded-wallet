import '@polkadot/api-augment';

import { ethers } from 'ethers6';
import {
  AccountWallet,
  AccountWalletTypes,
  AppParams,
  AuthData,
  AuthStrategyName,
  Events,
  GaslessTxType,
  RegisterData,
  SignMessageParams,
  SignatureCallback,
  TransactionItem,
  WebauthnContract,
} from './types';
import { EVMAccountAbi, AccountManagerAbi, SubstrateAccountAbi } from './abi';
import PasswordStrategy from './strategies/password';
import PasskeyStrategy from './strategies/passkey';
import { getHashedUsername, abort, JsonMultiRpcProvider, getAbiForType } from './utils';
import mitt, { Emitter } from 'mitt';
import {
  ApillonApiErrors,
  ProxyWriteFunctionsByStrategy,
  SapphireMainnet,
  SapphireTestnet,
  WalletType,
} from './constants';
import { XdomainPasskey } from './xdomain';
import EthereumEnvironment from './env/ethereum';
import SubstrateEnvironment from './env/substrate';

class EmbeddedWallet {
  sapphireProvider: ethers.JsonRpcProvider;
  sapphireChainId = 0;
  accountManagerAddress: string;
  accountManagerContract: WebauthnContract;
  abiCoder = ethers.AbiCoder.defaultAbiCoder();
  events: Emitter<Events>;
  apillonClientId: string;
  xdomain?: XdomainPasskey;
  evm: EthereumEnvironment;
  ss: SubstrateEnvironment;

  defaultNetworkId = 0 as number | string;

  user = {
    username: '',
    authStrategy: 'passkey' as AuthStrategyName,
    walletIndex: 0,
    walletType: WalletType.EVM as AccountWalletTypes,
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
    this.sapphireProvider = new JsonMultiRpcProvider([
      import.meta.env.VITE_SAPPHIRE_URL ?? 'https://sapphire.oasis.io',
      ...(import.meta.env.VITE_SAPPHIRE_BACKUP_URLS
        ? import.meta.env.VITE_SAPPHIRE_BACKUP_URLS.replace(/\s/g, '').split(',')
        : []),
    ]);

    this.loadSapphireChainId();

    this.accountManagerAddress =
      import.meta.env.VITE_ACCOUNT_MANAGER_ADDRESS ?? '0x50dE236a7ce372E7a09956087Fb4862CA1a887aA';

    this.accountManagerContract = new ethers.Contract(
      this.accountManagerAddress,
      AccountManagerAbi,
      new ethers.VoidSigner(ethers.ZeroAddress, this.sapphireProvider)
    ) as unknown as WebauthnContract;

    this.defaultNetworkId = params?.defaultNetworkId || this.defaultNetworkId;
    this.events = mitt<Events>();
    this.apillonClientId = params?.clientId || '';
    this.xdomain = new XdomainPasskey(this.apillonClientId, params?.passkeyAuthMode || 'redirect');
    this.evm = new EthereumEnvironment(this, params?.networks || []);
    this.ss = new SubstrateEnvironment(this, params?.networksSubstrate || []);
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
   * @param skipAccountWallets  Dont make another request for listing the wallets on account (used to be used on gateway)
   * @param origin  Add custom header for origin website
   */
  async register(
    strategy: AuthStrategyName,
    authData: AuthData,
    hashedUsername?: Buffer,
    skipAccountWallets = false,
    origin?: string
  ) {
    if (!this.sapphireProvider) {
      abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
      return;
    }

    if (!this.accountManagerContract) {
      abort('ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED');
      return;
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
              // AccountManagerAbi createAccount
              'tuple(bytes32 hashedUsername, bytes credentialId, tuple(uint8 kty, int8 alg, uint8 crv, uint256 x, uint256 y) pubkey, bytes32 optionalPassword, tuple(uint8 walletType, bytes32 keypairSecret) wallet)',
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
    const gaslessParams = await this.getApillonSignature(gaslessData, origin);

    if (!gaslessParams.signature) {
      abort('CANT_GET_SIGNATURE');
      return;
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
    const txReceipt = await this.evm.waitForTxReceipt(txHash);

    if (txReceipt) {
      if (skipAccountWallets) {
        return '';
      }

      if (txReceipt?.logs?.[0]) {
        const parsed = new ethers.Interface(getAbiForType(authData.walletType)).parseLog(
          txReceipt.logs[0]
        );

        if (parsed?.args?.[0]) {
          this.initAccountWallets([parsed.args[0]], authData.walletType);
        }
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

    // also saves wallets via initAccountWallets
    await this.getAccountWallets({ authData, strategy, reload: true });

    return await this.finalizeAccountAuth(strategy, authData);
  }

  async getAccountBalance(address: string, networkId = this.defaultNetworkId, decimals = 18) {
    if (typeof networkId === 'string') {
      return await this.ss.getAccountBalance(address, networkId, decimals);
    }

    return await this.evm.getAccountBalance(address, networkId, decimals);
  }

  async getAccountPrivateKey(
    params: {
      strategy?: AuthStrategyName;
      authData?: AuthData;
      walletIndex?: number;
    } = {}
  ) {
    if (!this.sapphireProvider) {
      abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
      return;
    }

    if (!params.strategy) {
      params.strategy = this.user.authStrategy;
    }

    if (!params.authData) {
      if (params.strategy === 'passkey' && this.user.username) {
        params.authData = {
          username: this.user.username,
        };
      } else {
        abort('AUTHENTICATION_DATA_NOT_PROVIDED');
        return;
      }
    }

    const AC = new ethers.Interface(getAbiForType(params.authData.walletType));
    const data = AC.encodeFunctionData('exportPrivateKey', [params.walletIndex]);

    /**
     * Authenticate user and sign message
     */
    const res = await this.getProxyForStrategy(
      params.strategy || this.user.authStrategy,
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
   * Get wallets added on user's account. Requires authentication.
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

    if (!params?.authData?.username) {
      if (params.strategy === 'passkey' && this.user.username) {
        params.authData = {
          username: this.user.username,
        };
      } else {
        abort('AUTHENTICATION_DATA_NOT_PROVIDED');
        return;
      }
    }

    if (!params?.authData?.walletType) {
      params.authData.walletType = WalletType.EVM;
    }

    if (!params.reload) {
      if (params.authData.walletType === WalletType.EVM && this.evm.userWallets.length) {
        return this.evm.userWallets;
      } else if (
        params.authData.walletType === WalletType.SUBSTRATE &&
        this.ss.userWallets.length
      ) {
        return this.ss.userWallets;
      }
    }

    if (!params.strategy) {
      params.strategy = this.user.authStrategy;
    }

    const AC = new ethers.Interface(getAbiForType(params.authData.walletType));
    const data = AC.encodeFunctionData('getWalletList', []);
    const res = await this.getProxyForStrategy(params.strategy, data, params.authData!);

    if (res) {
      const [accountWallets] = AC.decodeFunctionResult('getWalletList', res).toArray();

      if (accountWallets) {
        return (
          this.initAccountWallets(accountWallets as string[], params.authData?.walletType) || []
        );
      } else {
        abort('CANT_GET_ACCOUNT_WALLETS');
        return;
      }
    }
  }

  initAccountWallets(accountWallets: string[], walletType: AccountWalletTypes = WalletType.EVM) {
    if (Array.isArray(accountWallets) && accountWallets.length) {
      const isSubstrate = walletType === WalletType.SUBSTRATE;

      const mapped = accountWallets
        .map((address, index) => ({
          address: isSubstrate ? address : `0x${address.slice(-40)}`,
          walletType,
          index,
        }))
        .filter(x => !!x.address);

      if (isSubstrate) {
        this.events.emit('dataUpdated', {
          name: 'walletsSS',
          newValue: mapped,
          oldValue: this.ss.userWallets,
        });

        this.ss.userWallets = mapped;
      } else {
        this.events.emit('dataUpdated', {
          name: 'walletsEVM',
          newValue: mapped,
          oldValue: this.evm.userWallets,
        });

        this.evm.userWallets = mapped;
      }

      return mapped as AccountWallet[];
    }
  }

  /**
   * Add new wallet or import from privateKey.
   * Returns tx hash on success.
   */
  async addAccountWallet(params: {
    privateKey?: string;
    authData?: AuthData;
    strategy?: AuthStrategyName;
    internalLabel?: string;
    internalData?: string;
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
      params.strategy = this.user.authStrategy;
    }

    if (!params.authData) {
      if (params.strategy === 'passkey' && this.user.username) {
        params.authData = {
          username: this.user.username,
        };
      } else {
        abort('AUTHENTICATION_DATA_NOT_PROVIDED');
        return;
      }
    }

    if (!params?.authData?.walletType) {
      params.authData.walletType = WalletType.EVM;
    }

    const data = this.abiCoder.encode(
      ['tuple(uint256 walletType, bytes32 keypairSecret)'],
      [
        {
          walletType: BigInt(params.authData.walletType),
          keypairSecret: params.privateKey || ethers.ZeroHash,
        },
      ]
    );

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
      label: params.privateKey ? 'Import new account' : 'Add new account',
      internalLabel: params.internalLabel,
      internalData: params.internalData,
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
    gaslessData: Parameters<SignatureCallback>[0],
    origin?: string
  ): ReturnType<SignatureCallback> {
    if (!this.apillonClientId) {
      abort('NO_APILLON_CLIENT_ID');
      return { signature: '', gasLimit: 0, timestamp: 0 };
    }

    const res = await (
      await fetch(
        `${import.meta.env.VITE_APILLON_BASE_URL ?? 'https://api.apillon.io'}/embedded-wallet/signature`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: gaslessData,
            integration_uuid: this.apillonClientId,
            ...(origin ? { referrerDomain: origin } : {}),
          }),
        }
      )
    ).json();

    if (res.data) {
      return {
        signature: res.data.signature,
        gasLimit: res.data.gasLimit || 0,
        gasPrice: res.data.gasPrice || 0,
        timestamp: res.data.timestamp,
      };
    } else if (res.code && ApillonApiErrors[res.code]) {
      throw new Error(ApillonApiErrors[res.code]);
      // return { signature: '', gasLimit: 0, timestamp: 0, error: ApillonApiErrors[res.code] };
    }

    return { signature: '', gasLimit: 0, timestamp: 0 };
  }

  /**
   * Update user data and trigger events
   */
  setAccount(params: {
    username?: string;
    walletIndex?: number;
    strategy?: AuthStrategyName;
    contractAddress?: string;
    wallets?: AccountWallet[];
    walletType?: AccountWalletTypes;
  }) {
    if (typeof params.username !== 'undefined' && params.username !== this.user.username) {
      this.events.emit('dataUpdated', {
        name: 'username',
        newValue: params.username,
        oldValue: this.user.username,
      });
      this.user.username = params.username;
    }

    if (
      typeof params.walletIndex !== 'undefined' &&
      params.walletIndex >= 0 &&
      params.walletIndex !== this.user.walletIndex
    ) {
      this.events.emit('dataUpdated', {
        name: 'walletIndex',
        newValue: params.walletIndex,
        oldValue: this.user.walletIndex,
      });
      this.user.walletIndex = params.walletIndex;
    }

    if (typeof params.strategy !== 'undefined' && params.strategy !== this.user.authStrategy) {
      this.events.emit('dataUpdated', {
        name: 'authStrategy',
        newValue: params.strategy,
        oldValue: this.user.authStrategy,
      });
      this.user.authStrategy = params.strategy;
    }

    const isSubstrate = params.walletType === WalletType.SUBSTRATE;

    if (
      typeof params.contractAddress !== 'undefined' &&
      (((params.walletType === WalletType.EVM || !params.walletType) &&
        params.contractAddress !== this.evm.userContractAddress) ||
        (params.walletType === WalletType.SUBSTRATE &&
          params.contractAddress !== this.ss.userContractAddress))
    ) {
      this.events.emit('dataUpdated', {
        name: isSubstrate ? 'contractAddressSS' : 'contractAddressEVM',
        newValue: params.contractAddress,
        oldValue: isSubstrate ? this.ss.userContractAddress : this.evm.userContractAddress,
      });

      if (isSubstrate) {
        this.ss.userContractAddress = params.contractAddress;
      } else {
        this.evm.userContractAddress = params.contractAddress;
      }
    }

    if (
      Array.isArray(params.wallets) &&
      (((params.walletType === WalletType.EVM || !params.walletType) &&
        params.wallets.length !== this.evm.userWallets.length) ||
        (params.walletType === WalletType.SUBSTRATE &&
          params.wallets.length !== this.ss.userWallets.length))
    ) {
      this.events.emit('dataUpdated', {
        name: isSubstrate ? 'walletsSS' : 'walletsEVM',
        newValue: params.wallets,
        oldValue: isSubstrate ? this.ss.userWallets : this.evm.userWallets,
      });

      if (isSubstrate) {
        this.ss.userWallets = [...params.wallets];
      } else {
        this.evm.userWallets = [...params.wallets];
      }
    }

    if (typeof params.walletType !== 'undefined' && params.walletType !== this.user.walletType) {
      this.events.emit('dataUpdated', {
        name: 'walletType',
        newValue: params.walletType,
        oldValue: this.user.walletType,
      });
      this.user.walletType = params.walletType;
    }
  }

  setWallets(wallets: AccountWallet[], walletType: AccountWalletTypes = WalletType.EVM) {
    const isSubstrate = walletType === WalletType.SUBSTRATE;

    this.events.emit('dataUpdated', {
      name: isSubstrate ? 'walletsSS' : 'walletsEVM',
      newValue: wallets,
      oldValue: isSubstrate ? this.ss.userWallets : this.evm.userWallets,
    });

    if (isSubstrate) {
      this.ss.userWallets = [...wallets];
    } else {
      this.evm.userWallets = [...wallets];
    }
  }

  async initContractAddress(authData: AuthData) {
    const walletType = authData.walletType || WalletType.EVM;
    const isSubstrate = walletType === WalletType.SUBSTRATE;

    if (isSubstrate && this.ss.userContractAddress) {
      return this.ss.userContractAddress;
    } else if (!isSubstrate && this.evm.userContractAddress) {
      return this.evm.userContractAddress;
    }

    const hashedUsername = await getHashedUsername(authData.username);

    const address = (await this.accountManagerContract.getAccount(
      hashedUsername as any,
      BigInt(walletType)
    )) as string;

    if (isSubstrate) {
      this.ss.userContractAddress = address;
    } else {
      this.evm.userContractAddress = address;
    }

    this.events.emit('dataUpdated', {
      name: isSubstrate ? 'contractAddressSS' : 'contractAddressEVM',
      newValue: address,
      oldValue: '',
    });
  }

  /**
   * Get a wallet address for account and pass it to listeners.
   * Update the stored user.
   * This process includes getting all wallets (getAccountWallets) which requires authentication (when no cache is available).
   */
  async finalizeAccountAuth(strategy: AuthStrategyName, authData: AuthData) {
    await this.initContractAddress(authData);

    // const addr = await this.getAccountAddress(strategy, authData);

    let addr = '';
    const isSubstrate = authData.walletType === WalletType.SUBSTRATE;

    if ((isSubstrate && this.ss.userWallets.length) || this.evm.userWallets.length) {
      if (isSubstrate && this.ss.userWallets.length > this.user.walletIndex) {
        addr = this.ss.userWallets[this.user.walletIndex].address;
      } else if (!isSubstrate && this.evm.userWallets.length > this.user.walletIndex) {
        addr = this.evm.userWallets[this.user.walletIndex].address;
      } else {
        this.events.emit('dataUpdated', {
          name: 'walletIndex',
          newValue: 0,
          oldValue: this.user.walletIndex,
        });

        this.user.walletIndex = 0;

        addr = isSubstrate
          ? this.ss.userWallets[this.user.walletIndex].address
          : this.evm.userWallets[this.user.walletIndex].address;
      }
    }

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
      oldValue: this.user.authStrategy,
    });

    this.events.emit('dataUpdated', {
      name: 'username',
      newValue: authData.username,
      oldValue: this.user.username,
    });

    this.events.emit('dataUpdated', {
      name: 'walletType',
      newValue: authData.walletType || WalletType.EVM,
      oldValue: this.user.walletType,
    });

    this.user.authStrategy = strategy;
    this.user.username = authData.username;
    this.user.walletType = authData.walletType || WalletType.EVM;

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
      params.strategy = this.user.authStrategy;
    }

    if (!params.authData) {
      if (params.strategy === 'passkey' && this.user.username) {
        params.authData = {
          username: this.user.username,
        };
      } else {
        abort('AUTHENTICATION_DATA_NOT_PROVIDED');
      }
    }

    const isSubstrate = params.authData?.walletType === WalletType.SUBSTRATE;

    const AC = new ethers.Interface(isSubstrate ? SubstrateAccountAbi : EVMAccountAbi);

    let data = params.data || '';
    const originalMessage = params.message;

    if (!data || params.mustConfirm) {
      // maybe check if msg.length !== 66
      if (typeof params.message === 'string' && !params.message.startsWith('0x')) {
        params.message = ethers.hashMessage(params.message);
      }

      data = AC.encodeFunctionData('sign', [
        params.walletIndex || params.walletIndex === 0 ? params.walletIndex : this.user.walletIndex,
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

      /**
       * Not RSV when SS
       * @TODO Confirm
       */
      if (isSubstrate) {
        if (params.resolve) {
          params.resolve(signedRSV);
        }

        return signedRSV;
      }

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
   * Helper for triggering different auth strategies
   * Calls account manager method `proxyView`.
   */
  async getProxyForStrategy(
    strategy: AuthStrategyName,
    data: any,
    authData: AuthData
  ): Promise<any> {
    if (!this.accountManagerContract) {
      abort('ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED');
      return;
    }

    if (strategy === 'password') {
      return await new PasswordStrategy(this).getProxyResponse(data, authData);
    } else if (strategy === 'passkey') {
      return await new PasskeyStrategy(this).getProxyResponse(data, authData);
    }
  }

  /**
   * Uses signContractWrite to invoke an account manager method and broadcast the tx
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
      return;
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
    internalData?: string;
  }) {
    if (!this.sapphireProvider) {
      abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
      return;
    }

    if (!this.accountManagerContract) {
      abort('ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED');
      return;
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
      abort('CANT_GET_SIGNATURE');
      return;
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

    const res = await this.evm.broadcastTransaction(
      signedTx,
      this.sapphireChainId,
      params.label || 'Gasless Transaction',
      params.internalLabel || `gasless_${params.txType}`,
      params.internalData
    );

    if (res?.txHash) {
      return res.txHash;
    }
  }

  /**
   * Prepare tx and emit `txSubmitted` event (to show tx in tx history in UI e.g.)
   */
  submitTransaction(
    txHash: string,
    signedTxData?: any,
    chainId?: number | string,
    label = 'Transaction',
    internalLabel?: string
  ) {
    const isSubstrate = this.user.walletType === WalletType.SUBSTRATE;
    const owner = isSubstrate
      ? this.ss.userWallets[this.user.walletIndex]
      : this.evm.userWallets[this.user.walletIndex];
    const explorer = isSubstrate
      ? this.ss.explorerUrls[chainId || this.defaultNetworkId]
      : this.evm.explorerUrls[(chainId || this.defaultNetworkId) as number];

    const txItem = {
      hash: txHash,
      label,
      rawData: signedTxData || '',
      owner: owner.address || 'none',
      status: 'pending' as const,
      chainId: chainId || this.defaultNetworkId,
      explorerUrl: explorer ? `${explorer}/tx/${txHash}` : '',
      createdAt: Date.now(),
      internalLabel,
    } as TransactionItem;

    this.events.emit('txSubmitted', txItem);

    return txItem;
  }
  // #endregion

  // #region Helpers
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

  setDefaultNetworkId(networkId: number | string) {
    if (
      (typeof networkId === 'number' && this.evm.rpcUrls[networkId]) ||
      (typeof networkId === 'string' && this.ss.rpcUrls[networkId]) ||
      networkId === SapphireMainnet ||
      networkId === SapphireTestnet
    ) {
      this.events.emit('dataUpdated', {
        name: 'defaultNetworkId',
        newValue: networkId,
        oldValue: this.defaultNetworkId,
      });

      if (typeof networkId === 'number') {
        this.events.emit('chainChanged', { chainId: `0x${networkId.toString(16)}` });
        this.events.emit('dataUpdated', {
          name: 'walletType',
          newValue: WalletType.EVM,
          oldValue: this.user.walletType,
        });
        this.user.walletType = WalletType.EVM;
      } else {
        this.events.emit('dataUpdated', {
          name: 'walletType',
          newValue: WalletType.SUBSTRATE,
          oldValue: this.user.walletType,
        });
        this.user.walletType = WalletType.SUBSTRATE;
      }

      this.defaultNetworkId = networkId;

      return true;
    }

    return false;
  }

  /**
   * Send event requestChainChange, wait for it to resolve.
   * Throws error if chain was not changed.
   */
  async handleNetworkChange(chainId?: number | string) {
    if (chainId && chainId !== this.defaultNetworkId) {
      if (typeof chainId === 'number') {
        const isChanged = await new Promise(resolve =>
          this.events.emit('requestChainChange', { chainId, resolve })
        );

        if (!isChanged) {
          return abort('CHAIN_CHANGE_FAILED');
        }
      } else {
        /**
         * @TODO Handle substrate
         */
      }

      this.setDefaultNetworkId(chainId);
    }
  }

  // Get sapphire chain id from connected provider
  async loadSapphireChainId() {
    if (!this.sapphireChainId && !!this.sapphireProvider) {
      this.sapphireChainId = +(await this.sapphireProvider.getNetwork()).chainId.toString();
    }

    return this.sapphireChainId;
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
