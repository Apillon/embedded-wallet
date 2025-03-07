import { useAccount, useContract, useWallet } from '@apillon/wallet-react';

export default function TestSdk() {
  const { info, getBalance } = useAccount();
  const { signMessage, sendTransaction } = useWallet();

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

  return (
    <div
      style={{
        display: 'grid',
        gap: '8px',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      }}
    >
      <button
        onClick={async () => {
          console.log(await signMessage('test message'));
        }}
      >
        (SDK) Sign message
      </button>

      <button
        onClick={async () => {
          console.log(await getBalance());
        }}
      >
        (SDK) Get native balance
      </button>

      <button
        onClick={async () => {
          const res = await sendTransaction({
            to: '0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf',
            value: '10000000',
          });
          console.log(res);
        }}
      >
        (SDK) Transfer native balance
      </button>

      <button
        onClick={async () => {
          console.log(await read('balanceOf', [info?.activeWallet?.address]));
        }}
      >
        (SDK) Contract read (balanceOf)
      </button>

      <button
        onClick={async () => {
          console.log(await write('claim'));
        }}
      >
        (SDK) Contract write (claim)
      </button>

      <button
        onClick={async () => {
          const txHash = await write(
            'transfer',
            ['0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf', '10000000'],
            'React Transfer'
          );

          console.log(txHash);
        }}
      >
        (SDK) Contract write (transfer)
      </button>
    </div>
  );
}
