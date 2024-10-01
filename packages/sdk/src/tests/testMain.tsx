import React from 'react';
import ReactDOM from 'react-dom/client';
import TestApp from './TestApp.tsx';
import { initializeOnWindow } from '../../lib/utils.ts';

initializeOnWindow({
  clientId: '',
  defaultNetworkId: 1287,
  networkConfig: {
    1287: {
      rpcUrl: 'https://rpc.testnet.moonbeam.network',
      explorerUrl: 'https://moonbase.moonscan.io',
    },
    44787: {
      rpcUrl: 'https://alfajores-forno.celo-testnet.org',
      explorerUrl: 'https://explorer.celo.org/alfajores',
    },
    80002: {
      rpcUrl: 'https://rpc-amoy.polygon.technology',
      explorerUrl: 'https://www.oklink.com/amoy',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>
);
