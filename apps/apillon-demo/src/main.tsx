import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { initializeApp } from '@oasis-app-wallet/sdk/ui';

import './index.css';
import '@oasis-app-wallet/sdk/css';

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
        const res = await (
          await fetch(`https://api-dev.apillon.io/oasis/signature`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0X3V1aWQiOiI4MDlkM2I5Yy0zMTYzLTQ4MzAtYWY4Ni0yYjUzMWJmZjU1MmQiLCJhcGlLZXkiOiI0MDk1Nzg0OS0wZTgxLTQzOTYtOTE3ZC0zZDY5NzEyMDA0NWIiLCJpYXQiOjE3MjAwMTM1NDIsImV4cCI6MTcyMDAxMzg0Miwic3ViIjoib2FzaXMtc2RrLXRva2VuIn0.M5soXwZ6WPdd9va6jxkgWMFIhPlsP1OCfOODRABL4Mk',
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
