import EmbeddedEthersSigner from '../../lib/adapters/ethers';
import { getEmbeddedWallet } from '../../lib/utils';
import { ethers } from 'ethers';
import { ERC20Abi } from '../../lib/abi';

export default function TestEthers() {
  async function testEthers() {
    const w = getEmbeddedWallet();

    if (w) {
      console.log('Initialize signer');
      const signer = new EmbeddedEthersSigner(w.getRpcProviderForChainId(1287));
      console.log(signer);

      console.log('Sign message');
      const signed = await signer.signMessage('Please sign here');
      console.log(signed);

      const testContract = new ethers.Contract(
        '0xb1058eD01451B947A836dA3609f88C91804D0663',
        ERC20Abi,
        signer
      );

      console.log('Contract read (balanceOf)');
      console.log(await testContract.balanceOf('0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf'));

      console.log('Contract write (transfer)');
      const writeTxHash = await testContract.transfer(
        '0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf',
        ethers.parseEther('0.0000000001')
      );
      console.log(writeTxHash);
    }
  }

  return (
    <div>
      <button onClick={() => testEthers()}>Test Ethers</button>
    </div>
  );
}
