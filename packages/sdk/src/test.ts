import { networks } from '@apillon/wallet-networks';
import { EmbeddedWalletSDK } from '../lib/utils.ts';

document.addEventListener('DOMContentLoaded', () => {
  EmbeddedWalletSDK({
    clientId: import.meta.env.VITE_CLIENT_ID ?? 'YOUR INTEGRATION UUID HERE',
    defaultNetworkId: 23295,
    networks,
  });
});
