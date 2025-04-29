import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { EmbeddedWalletUI } from '@apillon/wallet-ui';
import './index.css';
import { DefaultEthereumNetworks, DefaultSubstrateNetworks } from '@apillon/wallet-sdk';

const AppWrapper = () => {
  const isInit = useRef(false);

  useEffect(() => {
    if (!isInit.current) {
      isInit.current = true;
      initWallet(sessionStorage?.getItem('mode') || 'popup');
    }
  }, []);

  function initWallet(mode = 'popup') {
    EmbeddedWalletUI('#wallet', {
      clientId: import.meta.env.VITE_CLIENT_ID ?? 'YOUR INTEGRATION UUID HERE',
      defaultNetworkId: 1287,
      broadcastAfterSign: true,
      passkeyAuthMode: mode as any,
      networks: DefaultEthereumNetworks,
      networksSubstrate: DefaultSubstrateNetworks,
    });
  }

  return <App onModeChange={mode => initWallet(mode)} />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
