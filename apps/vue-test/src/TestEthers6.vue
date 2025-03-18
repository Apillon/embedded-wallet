<script setup lang="ts">
import { EmbeddedEthersSigner } from '@apillon/wallet-sdk';
import { useWallet } from '@apillon/wallet-vue';
import { ethers } from 'ethers6';
import { onMounted } from 'vue';

const { wallet } = useWallet();

let signer: EmbeddedEthersSigner;
let contract: ethers.Contract;

onMounted(() => {
  if (wallet.value) {
    signer = new EmbeddedEthersSigner();

    contract = new ethers.Contract(
      '0x67b9DA16d0Adf2dF05F0564c081379479d0448f8',
      [
        'function claim() public',
        'function balanceOf(address) view returns (uint256)',
        'function transfer(address to, uint256 amount) public returns (bool)',
      ],
      signer
    );
  }
});

async function sign() {
  console.log(await signer.signMessage('test message'));
}

async function getNativeBalance() {
  console.log(await signer.provider.getBalance(await signer.getAddress()));
}

async function transferNativeBalance() {
  const res = await signer.sendTransaction({
    to: '0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf',
    value: ethers.parseUnits('0.01', 18),
  });
  console.log(res);
}

async function contractBalance() {
  console.log(await contract.balanceOf(await signer.getAddress()));
}

async function contractClaim() {
  console.log(await contract.claim());
}

async function contractTransfer() {
  const txHash = await contract.transfer(
    '0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf',
    ethers.parseUnits('0.01', 18)
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
    <button @click="sign()">(ethers 6) Sign message</button>

    <button @click="getNativeBalance()">(ethers 6) Get native balance</button>

    <button @click="transferNativeBalance()">(ethers 6) Transfer native balance</button>

    <button @click="contractBalance()">(ethers 6) Contract read (balanceOf)</button>

    <button @click="contractClaim()">(ethers 6) Contract write (claim)</button>

    <button @click="contractTransfer()">(ethers 6) Contract write (transfer)</button>
  </div>
</template>
