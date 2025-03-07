import { networks } from '@apillon/wallet-networks';
import { EmbeddedWalletUI } from '@apillon/wallet-ui';

EmbeddedWalletUI('#wallet', {
  clientId: import.meta.env.VITE_CLIENT_ID ?? 'YOUR INTEGRATION UUID HERE',
  defaultNetworkId: 1287,
  networks,
});
