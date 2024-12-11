<script lang="ts" setup>
import { useAccount, WalletWidget } from '@apillon/wallet-vue';
import './public/style.css';

const { info } = useAccount();
</script>

<template>
  <div>
    <WalletWidget
      :clientId="$config.public.CLIENT_ID"
      :defaultNetworkId="1287"
      :networks="[
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
      ]"
    />

    <div
      :style="{
        margin: '16px 0',
        border: 'solid 1px grey',
      }"
    />

    <p>username: {{ info.username }}</p>

    <p>address: {{ info?.activeWallet?.address }}</p>

    <br />

    <TestSdk />

    <template v-if="info?.activeWallet?.address">
      <br />

      <TestViem />

      <br />

      <TestEthers6 />

      <br />

      <TestEthers5 />
    </template>

    <NuxtWelcome />
  </div>
</template>
