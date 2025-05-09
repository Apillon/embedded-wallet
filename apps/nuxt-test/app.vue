<script lang="ts" setup>
import { EmbeddedWallet, useAccount } from '@apillon/wallet-vue';
import { DefaultEthereumNetworks, DefaultSubstrateNetworks, WalletType } from '@apillon/wallet-sdk';
import './public/style.css';

const { info } = useAccount();
</script>

<template>
  <div>
    <EmbeddedWallet
      :clientId="$config.public.CLIENT_ID"
      :defaultNetworkId="1287"
      :networks="DefaultEthereumNetworks"
      :networksSubstrate="DefaultSubstrateNetworks"
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

    <template
      v-if="info?.activeWallet?.address && info?.activeWallet?.walletType === WalletType.EVM"
    >
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
