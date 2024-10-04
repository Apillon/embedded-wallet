<script lang="ts" setup>
import { useAccount, useContract, WalletWidget } from '@apillon/wallet-vue';
import { ERC20Abi } from '@apillon/wallet-sdk';

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

const clientId = import.meta.env.VITE_CLIENT_ID ?? 'YOUR INTEGRATION UUID HERE';
</script>

<template>
  <div>
    <WalletWidget
      :clientId="clientId"
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

    <div
      :style="{
        margin: '16px 0',
        border: 'solid 1px grey',
      }"
    />

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
