import { ethers } from 'ethers6';
import { SapphireMainnet, SapphireTestnet, WalletType } from '../constants';
import {
  AccountWallet,
  ContractReadParams,
  ContractWriteParams,
  Network,
  PlainTransactionParams,
  TransactionItem,
} from '../types';
import { abort, networkIdIsSapphire } from '../utils';
import EmbeddedWallet from '..';
import { EVMAccountAbi, WalletDisconnectedError } from '../main';

class EthereumEnvironment {
  rpcUrls = {} as { [networkId: number]: string };
  providers = {} as { [networkId: number]: ethers.JsonRpcProvider };
  explorerUrls = {
    [SapphireMainnet]: 'https://explorer.oasis.io/mainnet/sapphire',
    [SapphireTestnet]: 'https://explorer.oasis.io/testnet/sapphire',
  } as { [networkId: number]: string };
  userWallets = [] as AccountWallet[];
  userContractAddress = '';

  constructor(
    public wallet: EmbeddedWallet,
    public networks: Network[]
  ) {
    if (networks) {
      for (const ntw of networks) {
        if (typeof ntw.id === 'number') {
          this.rpcUrls[ntw.id] = ntw.rpcUrl;
          this.explorerUrls[ntw.id] = ntw.explorerUrl;
        }
      }
    }

    /**
     * Provider connection events
     */
    try {
      if (
        typeof this.wallet.defaultNetworkId === 'number' &&
        this.getRpcProviderForNetworkId(this.wallet.defaultNetworkId)
      ) {
        this.wallet.events.emit('connect', {
          chainId: `0x${this.wallet.defaultNetworkId.toString(16)}`,
        });
      }
    } catch (_e) {
      /* empty */
    }
  }

  /**
   * Get provider object for networkId.
   * If no networkId specified, use sapphire network rpc.
   *
   * @TODO When no chainId provided, use wallet.defaultNetworkId
   */
  getRpcProviderForNetworkId(networkId?: number) {
    if (
      !networkId ||
      (networkId && !this.rpcUrls[networkId] && !!networkIdIsSapphire(+networkId.toString()))
    ) {
      /**
       * On sapphire network, use sapphire provider
       */
      if (!this.wallet.sapphireProvider) {
        this.wallet.events.emit('disconnect', { error: new WalletDisconnectedError() });
        abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
        return;
      }

      return this.wallet.sapphireProvider;
    } else {
      /**
       * On another network, use a provider for that chain
       */
      const ethProvider =
        this.providers[networkId] || new ethers.JsonRpcProvider(this.rpcUrls[networkId]);

      this.providers[networkId] = ethProvider;

      if (!ethProvider) {
        abort('CROSS_CHAIN_PROVIDER_NOT_INITIALIZED');
        return;
      }

      return ethProvider;
    }
  }

  async getAccountBalance(
    address: string,
    networkId = this.wallet.defaultNetworkId,
    decimals = 18
  ) {
    if (typeof networkId !== 'number') {
      return '0';
    }

    if (!networkId || (!this.rpcUrls[networkId] && networkIdIsSapphire(networkId))) {
      return ethers.formatUnits(
        (await this.wallet.sapphireProvider?.getBalance(address)) || 0n,
        decimals
      );
    }

    if (!this.rpcUrls[networkId]) {
      return '0';
    }

    const ethProvider = this.getRpcProviderForNetworkId(networkId);

    if (!ethProvider) {
      return '0';
    }

    return ethers.formatUnits(await ethProvider.getBalance(address), decimals);
  }

  /**
   * Authenticate with selected auth strategy through sapphire "Account Manager",
   * then return signed tx data and chainId of tx.
   */
  async signPlainTransaction(params: PlainTransactionParams) {
    const walletIndex =
      params.walletIndex || params.walletIndex === 0
        ? params.walletIndex
        : this.wallet.user.walletIndex;

    if (walletIndex >= this.userWallets.length) {
      abort('SIGN_TX_INVALID_WALLET_INDEX');
      return;
    }

    const chainId = this.validateChainId(
      params?.tx?.chainId ? +params.tx.chainId.toString() || 0 : 0
    );

    await this.wallet.handleNetworkChange(chainId);

    params.tx.chainId = chainId;

    if (!params.strategy) {
      params.strategy = this.wallet.user.authStrategy;
    }

    if (!params.authData) {
      if (params.strategy === 'passkey' && this.wallet.user.username) {
        params.authData = {
          username: this.wallet.user.username,
        };
      } else {
        abort('AUTHENTICATION_DATA_NOT_PROVIDED');
        return;
      }
    }

    if (!params.authData.walletType) {
      params.authData.walletType = WalletType.EVM;
    }

    const provider = this.getRpcProviderForNetworkId(chainId);

    if (!provider) {
      abort('SIGN_TX_NO_PROVIDER');
      return;
    }

    // Data must be BytesLike
    if (!params.tx.data) {
      params.tx.data = '0x';
    }

    /**
     * Get nonce if none provided
     */
    if (!params.tx.nonce) {
      params.tx.nonce = await provider.getTransactionCount(this.userWallets[walletIndex].address);
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
      const feeData = await provider.getFeeData();

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
      const gas = await provider.estimateGas(params.tx);
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
        chainId?: number | string;
      }>((resolve, reject) => {
        this.wallet.events.emit('txApprove', {
          plain: { ...params, mustConfirm: false, resolve, reject },
        });
      });
    }

    const AC = new ethers.Interface(EVMAccountAbi);
    const data = AC.encodeFunctionData('signEIP155', [walletIndex, params.tx]);

    /**
     * Authenticate user and sign transaction
     */
    const res = await this.wallet.getProxyForStrategy(params.strategy, data, params.authData!);

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
   * Get signed tx for making a contract write call.
   */
  async signContractWrite(params: ContractWriteParams) {
    const walletIndex =
      params.walletIndex || params.walletIndex === 0
        ? params.walletIndex
        : this.wallet.user.walletIndex;

    if (walletIndex >= this.userWallets.length) {
      abort('SIGN_TX_INVALID_WALLET_INDEX');
      return;
    }

    const chainId = this.validateChainId(params.chainId);

    await this.wallet.handleNetworkChange(chainId);

    if (!params.strategy) {
      params.strategy = this.wallet.user.authStrategy;
    }

    if (!params.authData) {
      if (params.strategy === 'passkey' && this.wallet.user.username) {
        params.authData = {
          username: this.wallet.user.username,
        };
      } else {
        abort('AUTHENTICATION_DATA_NOT_PROVIDED');
        return;
      }
    }

    if (!params.authData.walletType) {
      params.authData.walletType = WalletType.EVM;
    }

    const provider = this.getRpcProviderForNetworkId(chainId);

    if (!provider) {
      abort('SIGN_TX_NO_PROVIDER');
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
        this.wallet.events.emit('txApprove', {
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
      this.userWallets[walletIndex].address,
      provider
    ).populateTransaction({
      from: this.userWallets[walletIndex].address,
      to: params.contractAddress,
      value: 0,
      data: contractData,
    });

    if (!tx.gasPrice) {
      const feeData = await provider.getFeeData();
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
      const gas = await provider.estimateGas(tx);
      tx.gasLimit = !!gas ? Math.floor(Number(gas) * 1.01) : 1_000_000;
    }

    /**
     * Encode tx data and authenticate it with selected auth strategy through sapphire "Account Manager"
     */
    /**
     * @TODO Use prepareUnsignedPayload for SS instead of sign EIP155?
     */
    const AC = new ethers.Interface(EVMAccountAbi);
    const data = AC.encodeFunctionData('signEIP155', [params.walletIndex, tx]);
    const res = await this.wallet.getProxyForStrategy(params.strategy, data, params.authData!);

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

    await this.wallet.handleNetworkChange(chainId);

    const provider = this.getRpcProviderForNetworkId(chainId);
    if (!provider) {
      abort('SIGN_TX_NO_PROVIDER');
      return;
    }

    const contract = new ethers.Contract(params.contractAddress, params.contractAbi, provider);

    if (params.contractFunctionValues) {
      return await contract[params.contractFunctionName](...params.contractFunctionValues);
    } else {
      return await contract[params.contractFunctionName]();
    }
  }

  /**
   * Send raw EVM transaction data to network.
   * If chainId is provided, the transaction is sent to that network (cross-chain).
   */
  async broadcastTransaction(
    signedTxData: ethers.BytesLike,
    chainId?: number,
    label = 'Transaction',
    internalLabel?: string,
    internalData?: string
  ) {
    const ethProvider = this.getRpcProviderForNetworkId(chainId);

    if (!ethProvider) {
      abort('BROADCAST_TX_NO_PROVIDER');
      return;
    }

    const txHash = await ethProvider.send('eth_sendRawTransaction', [signedTxData]);

    let owner = 'none';

    if (
      this.wallet.user.walletType === WalletType.EVM &&
      this.wallet.user.walletIndex < this.userWallets.length
    ) {
      owner = this.userWallets[this.wallet.user.walletIndex].address;
    }

    const txItem = {
      hash: txHash,
      label,
      rawData: signedTxData,
      owner,
      status: 'pending' as const,
      chainId: chainId || this.wallet.defaultNetworkId,
      explorerUrl: this.explorerUrls[chainId || (this.wallet.defaultNetworkId as number)]
        ? `${this.explorerUrls[chainId || (this.wallet.defaultNetworkId as number)]}/tx/${txHash}`
        : '',
      createdAt: Date.now(),
      internalLabel,
      internalData,
    } as TransactionItem;

    this.wallet.events.emit('txSubmitted', txItem);

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
   * Helper for waiting for tx receipt
   */
  async waitForTxReceipt(txHash: string, provider?: ethers.JsonRpcProvider) {
    if (!provider && !this.wallet.sapphireProvider) {
      abort('SAPPHIRE_PROVIDER_NOT_INITIALIZED');
    }

    const maxRetries = 60;
    let retries = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const tr = await (provider || this.wallet.sapphireProvider).getTransactionReceipt(txHash);

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

  /**
   * Check if rpc is configured for desired network ID.
   */
  validateChainId(chainId?: number | string) {
    if (
      chainId &&
      (typeof chainId === 'string' || (!networkIdIsSapphire(chainId) && !this.rpcUrls[chainId]))
    ) {
      abort('NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID');
      return;
    } else if (
      !chainId &&
      ((!!this.wallet.defaultNetworkId && !this.rpcUrls[this.wallet.defaultNetworkId as number]) ||
        typeof this.wallet.defaultNetworkId === 'string')
    ) {
      abort('NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID');
      return;
    }

    /**
     * If no chain specified use default from app params
     */
    if (!chainId && !!this.wallet.defaultNetworkId) {
      chainId = this.wallet.defaultNetworkId as number;
    }

    return chainId as number;
  }
}

export { EthereumEnvironment };
export default EthereumEnvironment;
