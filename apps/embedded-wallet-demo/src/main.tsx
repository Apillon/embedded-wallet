import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { EmbeddedWalletUI } from '@apillon/wallet-ui';
import { AuthPasskeyMode } from '@apillon/wallet-sdk';
import './index.css';

const AppWrapper = () => {
  const [passkeyAuthMode, setPasskeyAuthMode] = useState<AuthPasskeyMode>('popup');

  useEffect(() => {
    EmbeddedWalletUI('#wallet', {
      clientId: import.meta.env.VITE_CLIENT_ID ?? 'YOUR INTEGRATION UUID HERE',
      defaultNetworkId: 1287,
      broadcastAfterSign: true,
      passkeyAuthMode,
      networks: [
        {
          name: 'Sapphire Testnet',
          id: 23295,
          rpcUrl: 'https://testnet.sapphire.oasis.io',
          explorerUrl: 'https://explorer.oasis.io/testnet/sapphire',
        },
        {
          name: 'Moonbase Testnet',
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
  }, [passkeyAuthMode]);

  return (
    <App setPasskeyAuthMode={setPasskeyAuthMode} />
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
