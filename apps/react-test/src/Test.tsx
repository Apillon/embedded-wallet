import { useAccount, WalletWidget } from '@apillon/wallet-react';
import TestSdk from './TestSdk';
import TestViem from './TestViem';
import TestEthers6 from './TestEthers6';
import TestEthers5 from './TestEthers5';

export default function Test() {
  const { info } = useAccount();

  return (
    <div>
      <WalletWidget
        clientId={import.meta.env.VITE_CLIENT_ID ?? 'YOUR INTEGRATION UUID HERE'}
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

      <div
        style={{
          margin: '16px 0',
          border: 'solid 1px grey',
        }}
      />

      <p>username: {info.username}</p>

      <p>address: {info?.activeWallet?.address}</p>

      <br />

      <TestSdk />

      <br />

      {!!info?.activeWallet?.address && <TestViem />}

      <br />

      {!!info?.activeWallet?.address && <TestEthers6 />}

      <br />

      {!!info?.activeWallet?.address && <TestEthers5 />}
    </div>
  );
}
