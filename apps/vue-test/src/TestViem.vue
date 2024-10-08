<script setup lang="ts">
import { EmbeddedViemAdapter } from '@apillon/wallet-sdk';
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  parseAbi,
  parseUnits,
} from 'viem';
import { moonbaseAlpha } from 'viem/chains';

const adapter = new EmbeddedViemAdapter();
const account = adapter.getAccount();

const publicClient = createPublicClient({
  chain: moonbaseAlpha,
  transport: http(),
});

const walletClient = createWalletClient({
  chain: moonbaseAlpha,
  transport: http(),
  account,
});

const contract = getContract({
  address: '0x67b9DA16d0Adf2dF05F0564c081379479d0448f8',
  abi: parseAbi([
    'function claim() public',
    'function balanceOf(address) view returns (uint256)',
    'function transfer(address to, uint256 amount) public returns (bool)',
  ]),
  client: {
    public: publicClient,
    wallet: walletClient,
  },
});

async function sign() {
  console.log(await account.signMessage({ message: 'test massage' }));
}

async function getNativeBalance() {
  console.log(
    await publicClient.getBalance({
      address: account.address,
    })
  );
}

async function transferNativeBalance() {
  const res = await walletClient.sendRawTransaction({
    serializedTransaction: await walletClient.signTransaction(
      await walletClient.prepareTransactionRequest({
        to: '0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf',
        value: parseUnits('0.01', 18),
      })
    ),
  });
  console.log(res);
}

async function contractBalance() {
  console.log(await contract.read.balanceOf([account.address]));
}

async function contractClaim() {
  console.log(await contract.write.claim());
}

async function contractTransfer() {
  const txHash = await contract.write.transfer([
    '0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf',
    parseUnits('0.01', 18),
  ]);

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
    <button @click="sign()">(Viem) Sign message</button>

    <button @click="getNativeBalance()">(Viem) Get native balance</button>

    <button @click="transferNativeBalance()">(Viem) Transfer native balance</button>

    <button @click="contractBalance()">(Viem) Contract read (balanceOf)</button>

    <button @click="contractClaim()">(Viem) Contract write (claim)</button>

    <button @click="contractTransfer()">(Viem) Contract write (transfer)</button>
  </div>
</template>
