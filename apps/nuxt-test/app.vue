<script lang="ts" setup>
import { networks } from '@apillon/wallet-networks';
import { EmbeddedWallet, useAccount } from '@apillon/wallet-vue';
import './public/style.css';

const { info } = useAccount();
</script>

<template>
  <div>
    <EmbeddedWallet
      :clientId="$config.public.CLIENT_ID"
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

    <NuxtWelcome />
  </div>
</template>
