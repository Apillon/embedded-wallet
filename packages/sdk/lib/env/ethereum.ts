import { ethers } from 'ethers6';
import { SapphireMainnet, SapphireTestnet, WalletType } from '../constants';
import { AccountWallet, Network, PlainTransactionParams } from '../types';
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

    const chainId = this.wallet.validateChainId(
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
}

export { EthereumEnvironment };
export default EthereumEnvironment;
