import { EmbeddedEthersSigner, getEmbeddedWallet } from '@apillon/wallet-sdk';
import { ethers } from 'ethers5';

start();

async function start() {
  // Wait for wallet SDK and account to initialize
  await new Promise<void>(resolve => {
    const clear = setInterval(() => {
      if (window.embeddedWallet && !!window.embeddedWallet.lastAccount.address) {
        clearInterval(clear);
        resolve();
      }
    }, 200);
  });

  const wallet = getEmbeddedWallet();

  const signer = new EmbeddedEthersSigner(wallet!.getRpcProviderForChainId(1287));

  const contract = new ethers.Contract(
    '0x67b9DA16d0Adf2dF05F0564c081379479d0448f8',
    [
      'function claim() public',
      'function balanceOf(address) view returns (uint256)',
      'function transfer(address to, uint256 amount) public returns (bool)',
    ],
    signer as any
  );

  document.getElementById('ethers5-sign')?.addEventListener('click', async () => {
    console.log(await signer.signMessage('test massage'));
  });

  document.getElementById('ethers5-native-balance')?.addEventListener('click', async () => {
    console.log(await signer.provider.getBalance(await signer.getAddress()));
  });

  document.getElementById('ethers5-native-transfer')?.addEventListener('click', async () => {
    const res = await signer.sendTransaction({
      to: '0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf',
      value: ethers.utils.parseUnits('0.01', 18).toBigInt(),
    });
    console.log(res);
  });

  document.getElementById('ethers5-contract-read')?.addEventListener('click', async () => {
    console.log((await contract.balanceOf(await signer.getAddress())).toString());
  });

  document.getElementById('ethers5-contract-claim')?.addEventListener('click', async () => {
    console.log(await contract.claim());
  });

  document.getElementById('ethers5-contract-transfer')?.addEventListener('click', async () => {
    const txHash = await contract.transfer(
      '0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf',
      ethers.utils.parseUnits('0.01', 18)
    );

    console.log(txHash);
  });
}
