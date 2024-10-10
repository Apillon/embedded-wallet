'use client';

import { useAccount, WalletWidget } from '@apillon/wallet-react';
import TestSdk from './TestSdk';
import TestViem from './TestViem';
import TestEthers6 from './TestEthers6';
import TestEthers5 from './TestEthers5';

export default function Test() {
  const { username, address } = useAccount();

  return (
    <div>
      <WalletWidget
        clientId={process.env.NEXT_PUBLIC_CLIENT_ID ?? 'YOUR INTEGRATION UUID HERE'}
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

      <div
        style={{
          margin: '16px 0',
          border: 'solid 1px grey',
        }}
      />

      <p>username: {username}</p>

      <p>address: {address}</p>

      <br />

      <TestSdk />

      <br />

      {!!address && <TestViem />}

      <br />

      {!!address && <TestEthers6 />}

      <br />

      {!!address && <TestEthers5 />}
    </div>
  );
}
