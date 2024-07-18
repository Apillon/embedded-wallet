import './App.css';
import { WalletWidget } from '@embedded-wallet/react';
import Test from './Test';

function App() {
  return (
    <>
      <div>
        <WalletWidget
          accountManagerAddress="0x5C357DaFfe6b1016C0c9A5607367E8f47765D4bC"
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

      <div
        style={{
          margin: '16px 0',
          border: 'solid 1px grey',
        }}
      />

      <Test />
    </>
  );
}

export default App;
