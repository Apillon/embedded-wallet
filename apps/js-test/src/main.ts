import { EmbeddedWalletUI } from '@apillon/wallet-ui';

EmbeddedWalletUI('#wallet', {
  clientId: import.meta.env.VITE_CLIENT_ID ?? 'YOUR INTEGRATION UUID HERE',
  defaultNetworkId: 1287,
  networks: [
    {
      name: 'Moonbase Testnet',
      id: 1287,
      rpcUrl: 'https://rpc.testnet.moonbeam.network',
      explorerUrl: 'https://moonbase.moonscan.io',
    },
  ],
});
