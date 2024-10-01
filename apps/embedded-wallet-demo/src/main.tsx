import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { initializeApp } from '@apillon/wallet-ui';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

setTimeout(() => {
  initializeApp('#wallet', {
    clientId: '',
    defaultNetworkId: 1287,
    networks: [
      {
        name: 'Moonbeam Testnet',
        id: 1287,
        rpcUrl: 'https://rpc.testnet.moonbeam.network',
        explorerUrl: 'https://moonbase.moonscan.io',
      },
      {
        name: 'Celo Alfajores Testnet',
        id: 44787,
        rpcUrl: 'https://alfajores-forno.celo-testnet.org',
        explorerUrl: 'https://explorer.celo.org/alfajores',
      },
      {
        name: 'Amoy',
        id: 80002,
        rpcUrl: 'https://rpc-amoy.polygon.technology',
        explorerUrl: 'https://www.oklink.com/amoy',
      },
    ],
  });
}, 5);
