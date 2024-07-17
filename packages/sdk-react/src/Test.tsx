import React from 'react';
import ReactDOM from 'react-dom/client';
import { WalletWidget } from '../lib/WalletWidget';

function Test() {
  return (
    <>
      <div>
        <WalletWidget
          legacyContract
          accountManagerAddress="0x5C357DaFfe6b1016C0c9A5607367E8f47765D4bC"
          // accountManagerAddress="0xF35C3eB93c6D3764A7D5efC6e9DEB614779437b1"
          defaultNetworkId={1287}
          networks={[
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
          ]}
        />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>
);
