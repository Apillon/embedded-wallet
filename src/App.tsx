import Test from './components/Test';
import WalletWidget from './components/WalletWidget';

export default function App() {
  return (
    <div>
      <WalletWidget
        networks={[
          { name: 'Moonbeam Testnet', id: 1287, rpcUrl: 'https://rpc.testnet.moonbeam.network' },
          {
            name: 'Celo Alfajores Testnet',
            id: 44787,
            rpcUrl: 'https://alfajores-forno.celo-testnet.org',
          },
          { name: 'Amoy', id: 80002, rpcUrl: 'https://rpc-amoy.polygon.technology	' },
        ]}
        defaultNetworkId={1287}
      />

      <hr className="my-12" />

      <Test />
    </div>
  );
}
