<script lang="ts" setup>
import { useAccount, useContract } from '@oasis-app-wallet/vue';
import { ERC20Abi } from './lib';

const { info, getBalance } = useAccount();
const { read, write } = useContract({
  abi: ERC20Abi,
  address: '0xb1058eD01451B947A836dA3609f88C91804D0663',
});

async function getBalanceNative() {
  console.log(await getBalance());
}

async function getBalanceERC20() {
  console.log(await read('balanceOf', [info.address]));
}

async function sendERC20() {
  const txHash = await write(
    'transfer',
    ['0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf', '10000000'],
    'React Transfer'
  );

  console.log(txHash);
}
</script>

<template>
  <div>
    <p>username: {{ info.username }}</p>

    <p>address: {{ info.address }}</p>

    <div
      :style="{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }"
    >
      <button @click="getBalanceNative()">Get balance</button>

      <button @click="getBalanceERC20()">Get ERC20 balance</button>

      <button @click="sendERC20()">Send ERC20 token</button>
    </div>
  </div>
</template>
