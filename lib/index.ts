import { ethers } from 'ethers';
import {
  AppParams,
  AuthData,
  AuthStrategyName,
  ContractReadParams,
  ContractWriteParams,
  Events,
  PlainTransactionParams,
  RegisterData,
  SignMessageParams,
  WebauthnContract,
} from './types';
import * as sapphire from '@oasisprotocol/sapphire-paratime';
import { AccountAbi, AccountManagerAbi } from './abi';
import PasswordStrategy from './strategies/password';
import PasskeyStrategy from './strategies/passkey';
import { networkIdIsSapphire, getHashedUsername } from './utils';
import mitt, { Emitter } from 'mitt';

class OasisAppWallet {
  sapphireProvider: ethers.JsonRpcProvider;
  accountManagerContract: WebauthnContract;
  abiCoder = ethers.AbiCoder.defaultAbiCoder();
  events: Emitter<Events>;

  defaultNetworkId = 0;
  rpcUrls = {} as { [networkId: number]: string };
  rpcProviders = {} as { [networkId: number]: ethers.JsonRpcProvider };
  explorerUrls = {
    23294: 'https://explorer.oasis.io/mainnet/sapphire',
    23295: 'https://explorer.oasis.io/testnet/sapphire',
  } as { [networkId: number]: string };
  lastAccountAddress = '';

  /**
   * Prepare sapphire provider and account manager (WebAuthn) contract.
   * Prepare data for available chains
   */
  constructor(params?: AppParams) {
    const ethSaphProvider = new ethers.JsonRpcProvider(
      params?.sapphireUrl || 'https://testnet.sapphire.oasis.dev'
    );

    this.sapphireProvider = sapphire.wrap(ethSaphProvider);

    this.accountManagerContract = new ethers.Contract(
      params?.accountManagerAddress || '0x5C357DaFfe6b1016C0c9A5607367E8f47765D4bC',
      AccountManagerAbi,
      new ethers.VoidSigner(ethers.ZeroAddress, this.sapphireProvider)
    ) as unknown as WebauthnContract;

    this.defaultNetworkId = params?.defaultNetworkId || this.defaultNetworkId;

    if (params?.networkConfig) {
      for (const k in params.networkConfig) {
        this.rpcUrls[k] = params.networkConfig[k].rpcUrl;
        this.explorerUrls[k] = params.networkConfig[k].explorerUrl;
      }
    }

    this.events = mitt<Events>();
  }

  // #region Auth utils
  /**
   * Check if `username` is already registered on accountManager
   */
  async userExists(username: string) {
    if (!this.sapphireProvider) {
      throw new Error('Sapphire provider not initialized');
    }

    if (!this.accountManagerContract) {
      throw new Error('Account manager contract not initialized');
    }

    try {
      const res = await this.accountManagerContract.userExists(
        (await getHashedUsername(username)) as any
      );

      return res;
    } catch (e) {
      console.error(e);
    }

    return false;
  }

  /**
   * Create new "wallet" for username.
   * Creates a new contract for each account on sapphire network.
   */
  async register(strategy: AuthStrategyName, authData: AuthData) {
    if (!this.sapphireProvider) {
      throw new Error('Sapphire provider not initialized');
    }

    if (!this.accountManagerContract) {
      throw new Error('Account manager contract not initialized');
    }

    try {
      let registerData = undefined as RegisterData | undefined;

      /**
       * Authentication method
       */
      if (strategy === 'password') {
        registerData = await new PasswordStrategy().getRegisterData(authData);
      } else if (strategy === 'passkey') {
        registerData = await new PasskeyStrategy().getRegisterData(authData);
      }

      const gaslessData = this.abiCoder.encode(
        ['tuple(bytes funcData, uint8 txType)'],
        [
          {
            funcData: this.abiCoder.encode(
              [
                'tuple(bytes32 hashedUsername, bytes credentialId, tuple(uint8 kty, int8 alg, uint8 crv, uint256 x, uint256 y) pubkey, bytes32 optionalPassword)',
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

      /**
       * @TODO Get signature from backend.
       * 1st request: GET {{Apillon API url}}/oasis/session-token
       * 2nd request: POST {{Apillon API url}}/oasis/signature
       *    {
       *      token: get from 1st request,
       *      data: gaslessData
       *    }
       * Use the signature for the signedTx.
       *
       * @TODO @Vinko 2nd request should return gasLimit & timestamp as well?
       */

      // if (!signature) {
      //   throw new Error('Cannot get dataHash signature');
      // }

      const signedTx = await this.accountManagerContract.generateGaslessTx(
        gaslessData,
        nonce as any,
        gasPrice as any
        // gasLimit as any, // gas limit
        // timestamp as any,
        // signature
      );

      const txHash = await this.sapphireProvider.send('eth_sendRawTransaction', [signedTx]);

      if (await this.waitForTxReceipt(txHash)) {
        return await this.getAccountAddress(authData.username);
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Check that credentials belong to some account.
   */
  async authenticate(strategy: AuthStrategyName, authData: AuthData) {
    if (!this.sapphireProvider) {
      throw new Error('Sapphire provider not initialized');
    }

    if (!this.accountManagerContract) {
      throw new Error('Account manager contract not initialized');
    }

    if (!authData.username) {
      throw new Error('No username');
    }

    const RANDOM_STRING = '0x000000000000000000000000000000000000000000000000000000000000DEAD';

    try {
      const hashedUsername = await getHashedUsername(authData.username);

      const AC = new ethers.Interface(AccountAbi);
      const data = AC.encodeFunctionData('sign', [RANDOM_STRING]);

      const loginData = await this.getProxyForStrategy(strategy, data, {
        ...authData,
        hashedUsername,
      });

      if (!loginData) {
        throw new Error('Login: no proxy data');
      }

      /**
       * Get public key from credentials
       */
      const [[r, s, v]] = AC.decodeFunctionResult('sign', loginData).toArray();
      const recoveredPublicKey = ethers.recoverAddress(RANDOM_STRING, {
        r,
        s,
        v,
      });

      /**
       * Get public key for username from account manager contract
       */
      const contractRes = await this.accountManagerContract.getAccount(hashedUsername as any);

      /**
       * If keys match -> Auth success, return account addresses
       */
      if (contractRes.length > 1 && recoveredPublicKey === contractRes[1]) {
        return await this.getAccountAddress(authData.username);
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Return address for username.
   * - Public EVM address
   * - Account contract address (deployed on sapphire)
   */
  async getAccountAddress(username: string) {
    if (!this.sapphireProvider) {
      throw new Error('Sapphire provider not initialized');
    }

    if (!this.accountManagerContract) {
      throw new Error('Account manager contract not initialized');
    }

    if (!username) {
      throw new Error('No username');
    }

    try {
      const hashedUsername = await getHashedUsername(username);

      const userData = await this.accountManagerContract.getAccount(hashedUsername as any);

      if (Array.isArray(userData) && userData.length > 1) {
        this.lastAccountAddress = userData[1] as string;

        return {
          publicAddress: userData[1] as string,
          accountContractAddress: userData[0] as string,
        };
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getAccountBalance(address: string, networkId = this.defaultNetworkId) {
    if (!networkId || networkIdIsSapphire(networkId)) {
      return ethers.formatEther((await this.sapphireProvider?.getBalance(address)) || 0n);
    }

    if (!this.rpcUrls[networkId]) {
      return '0';
    }

    const ethProvider =
      this.rpcProviders[networkId] || new ethers.JsonRpcProvider(this.rpcUrls[networkId]);

    return ethers.formatEther(await ethProvider.getBalance(address));
  }
  // #endregion

  // #region Transactions
  async signMessage(params: SignMessageParams) {
    if (!this.sapphireProvider) {
      throw new Error('Sapphire provider not initialized');
    }

    try {
      const AC = new ethers.Interface(AccountAbi);

      let data = params.data || '';
      const originalMessage = params.message;

      if (!data || params.mustConfirm) {
        if (typeof params.message === 'string') {
          params.message = ethers.encodeBytes32String(params.message);
        }

        data = AC.encodeFunctionData('sign', [params.message]);

        /**
         * Emits 'signatureRequest' if confirmation is needed.
         * Handle confirmation in UI part of app (call this method again w/o `mustConfirm`).
         */
        if (params.mustConfirm) {
          return await new Promise(resolve => {
            this.events.emit('signatureRequest', {
              ...params,
              data,
              message: originalMessage,
              mustConfirm: false,
              resolve,
            });
          });
        }
      }

      if (!params.authData) {
        throw new Error('Authentication data not provided');
      }

      /**
       * Authenticate user and sign message
       */
      const res = await this.getProxyForStrategy(params.strategy, data, params.authData);

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
    } catch (e) {
      console.error(e);
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

    params.tx.chainId = chainId;

    /**
     * Get nonce if none provided
     */
    if (!params.tx.nonce) {
      params.tx.nonce = await this.getRpcProviderForChainId(chainId).getTransactionCount(
        this.lastAccountAddress
      );
    }

    /**
     * Emit 'txApprove' if confirmation is needed.
     * Handle confirmation in UI part of app (call this method again w/o `mustConfirm`).
     */
    if (params.mustConfirm) {
      return await new Promise(resolve => {
        this.events.emit('txApprove', { plain: { ...params, mustConfirm: false, resolve } });
      });
    }

    if (!params.authData) {
      throw new Error('Authentication data not provided');
    }

    try {
      const AC = new ethers.Interface(AccountAbi);
      const data = AC.encodeFunctionData('signEIP155', [params.tx]);

      /**
       * Authenticate user and sign transaction
       */
      const res = await this.getProxyForStrategy(params.strategy, data, params.authData);

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
    } catch (e) {
      console.error(e);
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
      owner: this.lastAccountAddress || 'none',
      status: 'pending' as const,
      chainId: chainId || this.defaultNetworkId,
      explorerUrl: this.explorerUrls[chainId || this.defaultNetworkId]
        ? `${this.explorerUrls[chainId || this.defaultNetworkId]}/tx/${txHash}`
        : '',
      createdAt: Date.now(),
    };

    this.events.emit('transactionSubmitted', txItem);

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

    /**
     * Emit 'txApprove' if confirmation is needed.
     * Handle confirmation in UI part of app (call this method again w/o `mustConfirm`).
     */
    if (params.mustConfirm) {
      return await new Promise(resolve => {
        this.events.emit('txApprove', {
          contractWrite: { ...params, mustConfirm: false, resolve },
        });
      });
    }

    if (!params.authData) {
      throw new Error('Authentication data not provided');
    }

    const accountAddresses = await this.getAccountAddress(params.authData.username);

    if (!accountAddresses?.publicAddress) {
      throw new Error(`Couldn't get account address`);
    }

    try {
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
        accountAddresses.publicAddress,
        this.getRpcProviderForChainId(chainId)
      ).populateTransaction({
        from: accountAddresses.publicAddress,
        to: params.contractAddress,
        gasLimit: 1_000_000,
        value: 0,
        data: contractData,
      });
      tx.gasPrice = 20_000_000_000; // 20 gwei

      /**
       * Encode tx data and authenticate it with selected auth strategy through sapphire "Account Manager"
       */
      const AC = new ethers.Interface(AccountAbi);
      const data = AC.encodeFunctionData('signEIP155', [tx]);
      const res = await this.getProxyForStrategy(params.strategy, data, params.authData);

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
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Get result of contract read.
   * Utility function, this has nothing to do with Oasis.
   */
  async contractRead(params: ContractReadParams) {
    const chainId = this.validateChainId(params.chainId);
    const ethProvider = this.getRpcProviderForChainId(chainId);

    try {
      const contract = new ethers.Contract(params.contractAddress, params.contractAbi, ethProvider);

      if (params.contractFunctionValues) {
        return await contract[params.contractFunctionName](...params.contractFunctionValues);
      } else {
        return await contract[params.contractFunctionName]();
      }
    } catch (e) {
      console.error(e);
    }
  }
  // #endregion

  // #region Helpers
  /**
   * Helper for triggering different auth strategies
   */
  async getProxyForStrategy(strategy: AuthStrategyName, data: any, authData: AuthData) {
    if (!this.accountManagerContract) {
      throw new Error('Account manager contract not initialized');
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
        authData
      );
    }
  }

  /**
   * Helper for waiting for tx receipt
   */
  async waitForTxReceipt(txHash: string, provider?: ethers.JsonRpcProvider) {
    if (!provider && !this.sapphireProvider) {
      throw new Error('Sapphire provider not initialized');
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
    if (this.rpcUrls[networkId]) {
      this.defaultNetworkId = networkId;
    }
  }

  /**
   * Check if rpc is configured for desired network ID.
   */
  validateChainId(chainId?: number) {
    if (chainId && !networkIdIsSapphire(chainId) && !this.rpcUrls[chainId]) {
      throw new Error('No RPC url configured for selected chainId');
    } else if (!chainId && !!this.defaultNetworkId && !this.rpcUrls[this.defaultNetworkId]) {
      throw new Error('No RPC url configured for default chainId');
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
    if (!chainId || (chainId && !!networkIdIsSapphire(+chainId.toString()))) {
      /**
       * On sapphire network, use sapphire provider
       */
      if (!this.sapphireProvider) {
        throw new Error('Sapphire provider not initialized');
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
        throw new Error('Cross chain provider not initialized');
      }

      return ethProvider;
    }
  }
  // #endregion
}

export default OasisAppWallet;
