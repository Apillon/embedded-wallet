import { ApiPromise, WsProvider } from '@polkadot/api';
import { AccountWallet, Network } from '../types';
import { abort, EmbeddedWallet } from '../main';

class SubstrateEnvironment {
  rpcUrls = {} as { [networkId: string]: string };
  providers = {} as { [networkId: string]: WsProvider };
  apis = {} as { [networkId: string]: ApiPromise };
  explorerUrls = {} as { [networkId: string]: string };
  userWallets = [] as AccountWallet[];

  constructor(
    public wallet: EmbeddedWallet,
    public networks: Network[]
  ) {
    if (networks) {
      for (const ntw of networks) {
        if (typeof ntw.id === 'string') {
          this.rpcUrls[ntw.id] = ntw.rpcUrl;
          this.explorerUrls[ntw.id] = ntw.explorerUrl;
        }
      }
    }
  }

  async getApiForNetworkId(networkId: string) {
    if (!this.rpcUrls[networkId]) {
      return;
    }

    if (!this.providers[networkId]) {
      this.providers[networkId] = new WsProvider(this.rpcUrls[networkId]);
    }

    if (!this.apis[networkId]) {
      this.apis[networkId] = await ApiPromise.create({ provider: this.providers[networkId] });
    }

    if (!this.apis[networkId]) {
      abort('CROSS_CHAIN_PROVIDER_NOT_INITIALIZED');
      return;
    }

    return this.apis[networkId];
  }

  async getAccountBalance(
    address: string,
    networkId = this.wallet.defaultNetworkId,
    _decimals = 18
  ) {
    if (!networkId || typeof networkId !== 'string' || !this.rpcUrls[networkId]) {
      return '0';
    }

    const api = await this.getApiForNetworkId(networkId);

    if (!api) {
      return '';
    }

    const {
      data: { free },
    } = await api.query.system.account(address);

    return free.toString();
  }
}

export { SubstrateEnvironment };
export default SubstrateEnvironment;
