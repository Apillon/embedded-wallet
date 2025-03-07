<script setup lang="ts">
import { networks } from '@apillon/wallet-networks';
import EmbeddedWallet from '../lib/EmbeddedWallet.vue';
import { useAccount } from '../lib/main';

const { info } = useAccount();
</script>

<template>
  <div>
    <EmbeddedWallet
      clientId="YOUR INTEGRATION UUID HERE"
      :defaultNetworkId="1287"
      :networks="networks"
    />

    <p>username: {{ info.username }}</p>

    <p>address: {{ info.activeWallet }}</p>
  </div>
</template>
