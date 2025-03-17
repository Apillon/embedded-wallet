<script setup lang="ts">
import { useAccount, useContract, useWallet } from '@apillon/wallet-vue';

const { signMessage, sendTransaction } = useWallet();

const { info, getBalance } = useAccount();

const { read, write } = useContract({
  abi: [
    'function claim() public',
    'function balanceOf(address) view returns (uint256)',
    'function transfer(address to, uint256 amount) public returns (bool)',
  ],
  address: '0x67b9DA16d0Adf2dF05F0564c081379479d0448f8',
  chainId: 1287,
  broadcast: true,
});

async function sign() {
  console.log(await signMessage('test message'));
}

async function getNativeBalance() {
  console.log(await getBalance());
}

async function transferNativeBalance() {
  const res = await sendTransaction({
    to: '0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf',
    value: '10000000',
    chainId: 1287,
  });
  console.log(res);
}

async function contractBalance() {
  console.log(await read('balanceOf', [info?.activeWallet?.address]));
}

async function contractClaim() {
  console.log(await write('claim'));
}

async function contractTransfer() {
  const txHash = await write(
    'transfer',
    ['0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf', '10000000'],
    'Vue Transfer'
  );

  console.log(txHash);
}
</script>

<template>
  <div
    :style="{
      display: 'grid',
      gap: '8px',
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    }"
  >
    <button @click="sign()">(SDK) Sign message</button>

    <button @click="getNativeBalance()">(SDK) Get native balance</button>

    <button @click="transferNativeBalance()">(SDK) Transfer native balance</button>

    <button @click="contractBalance()">(SDK) Contract read (balanceOf)</button>

    <button @click="contractClaim()">(SDK) Contract write (claim)</button>

    <button @click="contractTransfer()">(SDK) Contract write (transfer)</button>
  </div>
</template>
