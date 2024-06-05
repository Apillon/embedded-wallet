import { ethers } from 'ethers';
import {
  AppParams,
  AuthData,
  AuthStrategyName,
  Events,
  PlainTransactionParams,
  RegisterData,
  WebauthnContract,
} from './types';
import * as sapphire from '@oasisprotocol/sapphire-paratime';
import { AccountAbi, AccountManagerAbi } from './abi';
import PasswordStrategy from './strategies/password';
import PasskeyStrategy from './strategies/passkey';
import { chainIdIsSapphire, getHashedUsername } from './utils';
import mitt, { Emitter } from 'mitt';

class OasisAppWallet {
  sapphireProvider: ethers.JsonRpcProvider;
  webauthnContract: WebauthnContract;
  abiCoder = ethers.AbiCoder.defaultAbiCoder();
  events: Emitter<Events>;

  defaultChainId = 0;
  rpcUrls = {} as { [chainId: number]: string };
  rpcProviders = {} as { [chainId: number]: ethers.JsonRpcProvider };

  /**
   * Prepare sapphire provider and account manager (WebAuthn) contract.
   * Prepare data for available chains
   */
  constructor(params?: AppParams) {
    const ethSaphProvider = new ethers.JsonRpcProvider('https://testnet.sapphire.oasis.dev');

    this.sapphireProvider = sapphire.wrap(ethSaphProvider);

    this.webauthnContract = new ethers.Contract(
      // 0x5C357DaFfe6b1016C0c9A5607367E8f47765D4bC,
      '0x921E78602E8584389FacEF9cF578Ba8790bb060f',
      // "0xa4a2472F3fe6ad4e04C89C11Af6A42c27335B8a6",
      AccountManagerAbi,
      new ethers.VoidSigner(ethers.ZeroAddress, this.sapphireProvider)
    ) as unknown as WebauthnContract;

    this.defaultChainId = params?.defaultChainId || this.defaultChainId;
    this.rpcUrls = params?.rpcUrls || this.rpcUrls;

    this.events = mitt<Events>();
  }

  // #region Auth utils
  /**
   * Create new "wallet" for username.
   * Creates a new contract for each account on sapphire network.
   */
  async register(strategy: AuthStrategyName, authData: AuthData) {
    if (!this.sapphireProvider) {
      throw new Error('Sapphire provider not initialized');
    }

    if (!this.webauthnContract) {
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
        await this.webauthnContract.gaspayingAddress()
      );

      const signedTx = await this.webauthnContract.generateGaslessTx(
        gaslessData,
        nonce as any,
        gasPrice as any
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

    if (!this.webauthnContract) {
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
      const contractRes = await this.webauthnContract.getAccount(hashedUsername as any);

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

    if (!this.webauthnContract) {
      throw new Error('Account manager contract not initialized');
    }

    if (!username) {
      throw new Error('No username');
    }

    try {
      const hashedUsername = await getHashedUsername(username);

      const userData = await this.webauthnContract.getAccount(hashedUsername as any);

      if (Array.isArray(userData) && userData.length > 1) {
        return {
          publicAddress: userData[1],
          accountContractAddress: userData[0],
        };
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getAccountBalance(address: string, chainId?: number) {
    if (!chainId || chainIdIsSapphire(chainId)) {
      return ethers.formatEther((await this.sapphireProvider?.getBalance(address)) || 0n);
    }

    if (!this.rpcUrls[chainId]) {
      return '0';
    }

    const ethProvider =
      this.rpcProviders[chainId] || new ethers.JsonRpcProvider(this.rpcUrls[chainId]);

    return ethers.formatEther(await ethProvider.getBalance(address));
  }
  // #endregion

  // #region Transactions
  /**
   * @TODO Might be wrong/useless
   */
  async signMessage(params: {
    strategy: AuthStrategyName;
    authData: AuthData;
    message: ethers.BytesLike | string;
  }) {
    if (!this.sapphireProvider) {
      throw new Error('Sapphire provider not initialized');
    }

    if (typeof params.message === 'string') {
      params.message = ethers.encodeBytes32String(params.message);
    }

    try {
      const AC = new ethers.Interface(AccountAbi);
      const data = AC.encodeFunctionData('sign', [params.message]);

      /**
       * Authenticate user and sign message
       */
      const res = await this.getProxyForStrategy(params.strategy, data, params.authData);

      if (res) {
        const [signed] = AC.decodeFunctionResult('sign', res).toArray();
        console.log(signed);
        return signed;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async sendPlainTransaction(params: PlainTransactionParams) {
    const chainId = params?.tx?.chainId ? +params.tx.chainId.toString() || 0 : 0;

    if (chainId && !chainIdIsSapphire(chainId) && !this.rpcUrls[chainId]) {
      throw new Error('No RPC url configured for selected chainId');
    } else if (!chainId && !!this.defaultChainId && !this.rpcUrls[this.defaultChainId]) {
      throw new Error('No RPC url configured for default chainId');
    }

    /**
     * If no chain specified use default from app params
     */
    if (!chainId && !!this.defaultChainId) {
      params.tx.chainId = this.defaultChainId;
    }

    /**
     * Emit 'txApprove' if confirmation is needed.
     * Handle confirmation in UI part of app (call this method again w/o `mustConfirm`).
     */
    if (params.mustConfirm) {
      this.events.emit('txApprove', { plain: { ...params, mustConfirm: false } });
      return;
    }

    /**
     * Get nonce if none provided
     */
    if (!params.tx.nonce) {
      params.tx.nonce = await this.sapphireProvider.getTransactionCount(
        await this.webauthnContract.gaspayingAddress()
      );
    }

    console.log(params.tx.nonce);

    try {
      const AC = new ethers.Interface(AccountAbi);
      const data = AC.encodeFunctionData('signEIP155', [params.tx]);

      /**
       * Authenticate user and sign transaction
       */
      const res = await this.getProxyForStrategy(params.strategy, data, params.authData);

      if (res) {
        const [signedTx] = AC.decodeFunctionResult('signEIP155', res).toArray();

        let txHash = '';
        let ethProvider = undefined as ethers.JsonRpcProvider | undefined;

        /**
         * Broadcast transaction
         */
        if (params.tx.chainId && !!chainIdIsSapphire(+params.tx.chainId.toString())) {
          /**
           * On sapphire network, use sapphire provider
           */
          if (!this.sapphireProvider) {
            throw new Error('Sapphire provider not initialized');
          }

          txHash = await this.sapphireProvider.send('eth_sendRawTransaction', [signedTx]);
        } else {
          /**
           * On another network, use a provider for that chain
           */
          ethProvider =
            this.rpcProviders[chainId] || new ethers.JsonRpcProvider(this.rpcUrls[chainId]);

          this.rpcProviders[chainId] = ethProvider;

          if (!ethProvider) {
            throw new Error('Cross chain provider not initialized');
          }

          txHash = await ethProvider.send('eth_sendRawTransaction', [signedTx]);
        }

        /**
         * @TODO Return txHash, leave receipt waiting to client
         */
        const receipt = await this.waitForTxReceipt(txHash, ethProvider);

        console.log(receipt);

        return receipt;
      }
    } catch (e) {
      console.error(e);
    }
  }

  // async getContractInterface(params: {
  //   address: string;
  //   abi: ethers.Interface | ethers.InterfaceAbi;
  // }) {
  //   const c = new ethers.Contract(
  //     params.address,
  //     params.abi,
  //     new ethers.VoidSigner(ethers.ZeroAddress, this.sapphireProvider)
  //   );
  // }
  // #endregion

  // #region Helpers
  /**
   * Helper for triggering different auth strategies
   */
  async getProxyForStrategy(strategy: AuthStrategyName, data: any, authData: AuthData) {
    if (!this.webauthnContract) {
      throw new Error('Account manager contract not initialized');
    }

    if (strategy === 'password') {
      return await new PasswordStrategy().getProxyResponse(this.webauthnContract, data, authData);
    } else if (strategy === 'passkey') {
      return await new PasskeyStrategy().getProxyResponse(this.webauthnContract, data, authData);
    }
  }

  /**
   * Helper for waiting for tx receipt
   */
  async waitForTxReceipt(txHash: string, provider?: ethers.JsonRpcProvider) {
    if (!provider || !this.sapphireProvider) {
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
  // #endregion
}

export default OasisAppWallet;
