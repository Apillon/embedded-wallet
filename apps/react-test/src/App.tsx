import './App.css';
import { WalletWidget } from '@apillon/wallet-react';
import Test from './Test';

function App() {
  return (
    <>
      <div>
        <WalletWidget
          clientId="YOUR INTEGRATION UUID HERE"
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
