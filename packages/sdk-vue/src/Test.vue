<script setup lang="ts">
import WalletWidget from '../lib/WalletWidget.vue';
import { useAccount } from '../lib/main';

const { info } = useAccount();
</script>

<template>
  <div>
    <WalletWidget
      accountManagerAddress="0x5C357DaFfe6b1016C0c9A5607367E8f47765D4bC"
      :isAuthEmail="false"
      :defaultNetworkId="1287"
      :networks="[
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
      ]"
    />

    <p>username: {{ info.username }}</p>

    <p>address: {{ info.address }}</p>
  </div>
</template>
