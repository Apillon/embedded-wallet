<script setup lang="ts">
import WalletWidget from '../lib/WalletWidget.vue';
import { useAccount } from '../lib/main';

const { info } = useAccount();
</script>

<template>
  <div>
    <WalletWidget
      clientId="YOUR INTEGRATION UUID HERE"
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

    <p>username: {{ info.username }}</p>

    <p>address: {{ info.activeWallet }}</p>
  </div>
</template>
