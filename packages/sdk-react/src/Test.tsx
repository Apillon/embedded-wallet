import React from 'react';
import ReactDOM from 'react-dom/client';
import { WalletWidget } from '../lib/WalletWidget';
import { useAccount } from '../lib/main';

export function Test() {
  const { info } = useAccount();

  return (
    <>
      <div>
        <WalletWidget
          clientId="YOUR INTEGRATION UUID HERE"
          defaultNetworkId={1287}
          networks={[
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
          ]}
        />

        <p>username: {info.username}</p>

        <p>address: {info.address}</p>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>
);
