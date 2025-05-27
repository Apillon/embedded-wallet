<script setup lang="ts">
import EmbeddedWallet from '../lib/EmbeddedWallet.vue';
import { useAccount } from '../lib/main';
import { DefaultEthereumNetworks, DefaultSubstrateNetworks } from '@apillon/wallet-sdk';

const { info } = useAccount();
</script>

<template>
  <div>
    <EmbeddedWallet
      clientId="YOUR INTEGRATION UUID HERE"
      :defaultNetworkId="1287"
      :networks="DefaultEthereumNetworks"
      :networks-substrate="DefaultSubstrateNetworks"
    />

    <p>username: {{ info.username }}</p>

    <p>address: {{ info.activeWallet }}</p>
  </div>
</template>
