import { ethers } from 'ethers6';
import { SapphireMainnet, SapphireTestnet } from '../constants';
import { AccountWallet, Network } from '../types';
import { abort, networkIdIsSapphire } from '../utils';
import EmbeddedWallet from '..';
import { WalletDisconnectedError } from '../main';

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
}

export { EthereumEnvironment };
export default EthereumEnvironment;
