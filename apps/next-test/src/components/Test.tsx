'use client';

import { networks } from '@apillon/wallet-networks';
import { EmbeddedWallet, useAccount } from '@apillon/wallet-react';
import TestEthers5 from './TestEthers5';
import TestEthers6 from './TestEthers6';
import TestSdk from './TestSdk';
import TestViem from './TestViem';

export default function Test() {
  const { info } = useAccount();

  return (
    <div>
      <EmbeddedWallet
        clientId={process.env.NEXT_PUBLIC_CLIENT_ID ?? 'YOUR INTEGRATION UUID HERE'}
        defaultNetworkId={1287}
        networks={networks}
      />

      <div
        style={{
          margin: '16px 0',
          border: 'solid 1px grey',
        }}
      />

      <p>username: {info.username}</p>

      <p>address: {info.activeWallet?.address}</p>

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
