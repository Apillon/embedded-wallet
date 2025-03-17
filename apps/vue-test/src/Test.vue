<script lang="ts" setup>
import { networks } from '@apillon/wallet-networks';
import { EmbeddedWallet, useAccount } from '@apillon/wallet-vue';
import TestEthers5 from './TestEthers5.vue';
import TestEthers6 from './TestEthers6.vue';
import TestSdk from './TestSdk.vue';
import TestViem from './TestViem.vue';

const { info } = useAccount();

const clientId = import.meta.env.VITE_CLIENT_ID ?? 'YOUR INTEGRATION UUID HERE';
</script>

<template>
  <div>
    <EmbeddedWallet
      :clientId="clientId"
      :defaultNetworkId="1287"
      :networks="networks"
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
  </div>
</template>
