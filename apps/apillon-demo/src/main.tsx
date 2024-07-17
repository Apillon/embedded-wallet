import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { initializeApp } from '@embedded-wallet/ui';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

setTimeout(() => {
  initializeApp('#wallet', {
    // legacyContract: true,
    // accountManagerAddress: '0x5C357DaFfe6b1016C0c9A5607367E8f47765D4bC',
    accountManagerAddress: '0xF35C3eB93c6D3764A7D5efC6e9DEB614779437b1',
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
    signatureCallback: async gaslessData => {
      try {
        const tokenRes = await (
          await fetch(`http://localhost:3000/session-token`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })
        ).json();

        const res = await (
          await fetch(`https://api-dev.apillon.io/oasis/signature`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token: tokenRes.data.token,
              data: gaslessData,
            }),
          })
        ).json();

        return {
          signature: res?.data.signature,
          gasLimit: res?.data.gasLimit || 0,
          gasPrice: res?.data.gasPrice || 0,
          timestamp: res?.data.timestamp,
        };
      } catch (e) {
        console.error('Signature request error', e);
      }

      return { signature: '', gasLimit: 0, timestamp: 0 };
    },
  });
}, 5);
