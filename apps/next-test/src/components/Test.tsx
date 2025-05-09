'use client';

import { EmbeddedWallet, useAccount } from '@apillon/wallet-react';
import TestEthers5 from './TestEthers5';
import TestEthers6 from './TestEthers6';
import TestSdk from './TestSdk';
import TestViem from './TestViem';
import { DefaultEthereumNetworks, DefaultSubstrateNetworks, WalletType } from '@apillon/wallet-sdk';

export default function Test() {
  const { info } = useAccount();

  return (
    <div>
      <EmbeddedWallet
        clientId={process.env.NEXT_PUBLIC_CLIENT_ID ?? 'YOUR INTEGRATION UUID HERE'}
        defaultNetworkId={1287}
        networks={DefaultEthereumNetworks}
        networksSubstrate={DefaultSubstrateNetworks}
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

      {!!info?.activeWallet?.address && info?.activeWallet?.walletType === WalletType.EVM && (
        <>
          <TestViem />

          <br />

          <TestEthers6 />

          <br />

          <TestEthers5 />
        </>
      )}
    </div>
  );
}
