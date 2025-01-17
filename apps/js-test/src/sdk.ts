import { getEmbeddedWallet } from '@apillon/wallet-sdk';

document.getElementById('sdk-sign')?.addEventListener('click', async () => {
  const w = getEmbeddedWallet();

  if (w) {
    const result = await w.signMessage({
      message: 'test massage',
      mustConfirm: true,
    });

    console.log(result);
  }
});

document.getElementById('sdk-native-balance')?.addEventListener('click', async () => {
  const w = getEmbeddedWallet();

  if (w) {
    const address = await w.getAccountAddress();

    if (address) {
      const result = await w.getAccountBalance(address);
      console.log(result);
    }
  }
});

document.getElementById('sdk-native-transfer')?.addEventListener('click', async () => {
  const w = getEmbeddedWallet();

  if (w) {
    const result = await w.signPlainTransaction({
      tx: {
        to: '0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf',
        value: '10000000',
      },
      mustConfirm: true,
    });

    console.log(result);

    if (result) {
      console.log(await w.broadcastTransaction(result.signedTxData, result.chainId));
    }
  }
});

document.getElementById('sdk-contract-read')?.addEventListener('click', async () => {
  const w = getEmbeddedWallet();

  if (w) {
    const address = await w.getAccountAddress();

    if (address) {
      const result = await w.contractRead({
        contractAbi: [
          'function claim() public',
          'function balanceOf(address) view returns (uint256)',
          'function transfer(address to, uint256 amount) public returns (bool)',
        ],
        contractAddress: '0x67b9DA16d0Adf2dF05F0564c081379479d0448f8',
        contractFunctionName: 'balanceOf',
        contractFunctionValues: [address],
        chainId: 1287,
      });

      console.log(result);
    }
  }
});

document.getElementById('sdk-contract-claim')?.addEventListener('click', async () => {
  const w = getEmbeddedWallet();

  if (w) {
    const result = await w.signContractWrite({
      contractAbi: [
        'function claim() public',
        'function balanceOf(address) view returns (uint256)',
        'function transfer(address to, uint256 amount) public returns (bool)',
      ],
      contractAddress: '0x67b9DA16d0Adf2dF05F0564c081379479d0448f8',
      contractFunctionName: 'claim',
      chainId: 1287,
      mustConfirm: true,
    });

    console.log(result);

    if (result) {
      console.log(await w.broadcastTransaction(result.signedTxData, result.chainId, 'JS claim'));
    }
  }
});

document.getElementById('sdk-contract-transfer')?.addEventListener('click', async () => {
  const w = getEmbeddedWallet();

  if (w) {
    const result = await w.signContractWrite({
      contractAbi: [
        'function claim() public',
        'function balanceOf(address) view returns (uint256)',
        'function transfer(address to, uint256 amount) public returns (bool)',
      ],
      contractAddress: '0x67b9DA16d0Adf2dF05F0564c081379479d0448f8',
      contractFunctionName: 'transfer',
      contractFunctionValues: ['0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf', '10000000'],
      chainId: 1287,
      mustConfirm: true,
    });

    console.log(result);

    if (result) {
      console.log(await w.broadcastTransaction(result.signedTxData, result.chainId, 'JS transfer'));
    }
  }
});
