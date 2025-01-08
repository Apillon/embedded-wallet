import WalletWidget from '../components/WalletWidget';
import TestEIP1193 from './TestEIP1193';
import TestSign from './TestSign';
import TestTx from './TestTx';

export default function TestApp() {
  return (
    <div>
      <h2>Wallet Widget</h2>

      <WalletWidget
        clientId={import.meta.env.VITE_CLIENT_ID ?? 'YOUR INTEGRATION UUID HERE'}
        broadcastAfterSign
        passkeyAuthMode="tab_process"
        // disableDefaultActivatorStyle
        defaultNetworkId={1287}
        networks={[
          {
            name: 'Moonbase Testnet',
            id: 1287,
            rpcUrl: 'https://rpc.testnet.moonbeam.network',
            explorerUrl: 'https://moonbase.moonscan.io',
            imageUrl: 'https://cryptologos.cc/logos/moonbeam-glmr-logo.png?v=022',
          },
          {
            name: 'Celo Alfajores Testnet',
            id: 44787,
            rpcUrl: 'https://alfajores-forno.celo-testnet.org',
            explorerUrl: 'https://explorer.celo.org/alfajores',
            imageUrl: 'https://cryptologos.cc/logos/celo-celo-logo.png?v=022',
          },
          {
            name: 'Amoy',
            id: 80002,
            rpcUrl: 'https://rpc-amoy.polygon.technology',
            explorerUrl: 'https://www.oklink.com/amoy',
            imageUrl: 'https://cryptologos.cc/logos/polygon-matic-logo.png?v=022',
          },
        ]}
      />

      <br />
      <br />

      <h2>Test sign</h2>

      <TestSign />

      <br />
      <br />

      <h2>EIP-1193 requests test</h2>

      <TestEIP1193 />

      <br />
      <br />

      <h2>Transaction tests</h2>

      <TestTx />
    </div>
  );
}
