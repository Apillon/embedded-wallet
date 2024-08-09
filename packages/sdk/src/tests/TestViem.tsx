import { createPublicClient, createWalletClient, getContract, http, parseEther } from 'viem';
import EmbeddedViemAdapter from '../../lib/adapters/viem';
import { getEmbeddedWallet } from '../../lib/utils';
import { moonbaseAlpha } from 'viem/chains';
import { ERC20Abi } from '../../lib/abi';

export default function TestViem() {
  async function testViem() {
    const w = getEmbeddedWallet();

    if (w) {
      console.log('Initialize adapter');
      const adapter = new EmbeddedViemAdapter();
      console.log(adapter);

      const acc = adapter.getAccount();

      console.log('Sign message');
      const signed = await acc.signMessage({ message: 'Please sign here via viem' });
      console.log(signed);

      const publicClient = createPublicClient({
        chain: moonbaseAlpha,
        transport: http(),
      });

      const walletClient = createWalletClient({
        chain: moonbaseAlpha,
        transport: http('https://rpc.testnet.moonbeam.network'),
        account: acc,
      });

      const testContract = getContract({
        address: '0xb1058eD01451B947A836dA3609f88C91804D0663',
        abi: ERC20Abi,
        client: {
          public: publicClient,
          wallet: walletClient,
        },
      });

      console.log('Contract read (balanceOf)');
      console.log(
        await testContract.read.balanceOf(['0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf'])
      );

      console.log('Contract write (transfer)');

      const writeTxHash = await testContract.write.transfer([
        '0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf',
        parseEther('0.0000000001'),
      ]);

      console.log(writeTxHash);
    }
  }

  return (
    <div>
      <button onClick={() => testViem()}>Test Viem</button>
    </div>
  );
}
