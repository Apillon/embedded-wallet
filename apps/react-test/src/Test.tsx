import { useAccount, useContract } from '@embedded-wallet/react';
import { ERC20Abi } from './lib';

export default function Test() {
  const { username, address, getBalance } = useAccount();
  const { read, write } = useContract({
    abi: ERC20Abi,
    address: '0xb1058eD01451B947A836dA3609f88C91804D0663',
  });

  return (
    <div>
      <p>username: {username}</p>

      <p>address: {address}</p>

      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={async () => {
            console.log(await getBalance());
          }}
        >
          Get balance
        </button>

        <button
          onClick={async () => {
            console.log(await read('balanceOf', [address]));
          }}
        >
          Get ERC20 balance
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
          Send ERC20 token
        </button>
      </div>
    </div>
  );
}
