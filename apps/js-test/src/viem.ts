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

start();

async function start() {
  // Wait for wallet SDK and account to initialize
  await new Promise<void>(resolve => {
    const clear = setInterval(() => {
      if (window.embeddedWallet && !!window.embeddedWallet.lastAccount.contractAddress) {
        clearInterval(clear);
        resolve();
      }
    }, 200);
  });

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

  document.getElementById('viem-sign')?.addEventListener('click', async () => {
    console.log(await account.signMessage({ message: 'test message' }));
  });

  document.getElementById('viem-native-balance')?.addEventListener('click', async () => {
    console.log(
      await publicClient.getBalance({
        address: account.address,
      })
    );
  });

  document.getElementById('viem-native-transfer')?.addEventListener('click', async () => {
    const res = await walletClient.sendRawTransaction({
      serializedTransaction: await walletClient.signTransaction(
        await walletClient.prepareTransactionRequest({
          to: '0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf',
          value: parseUnits('0.01', 18),
        })
      ),
    });

    console.log(res);
  });

  document.getElementById('viem-contract-read')?.addEventListener('click', async () => {
    console.log(await contract.read.balanceOf([account.address]));
  });

  document.getElementById('viem-contract-claim')?.addEventListener('click', async () => {
    console.log(await contract.write.claim());
  });

  document.getElementById('viem-contract-transfer')?.addEventListener('click', async () => {
    const txHash = await contract.write.transfer([
      '0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf',
      parseUnits('0.01', 18),
    ]);

    console.log(txHash);
  });
}
