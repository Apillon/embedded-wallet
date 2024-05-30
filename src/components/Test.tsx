import { useState } from 'react';
import { getOasisAppWallet } from '../../lib/utils';
import { ethers } from 'ethers';

export default function Test() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');

  return (
    <>
      <form
        className="flex gap-4 items-center mb-4"
        onSubmit={ev => {
          ev.preventDefault();
          const wallet = getOasisAppWallet();
          wallet?.register('passkey', { username: name });
        }}
      >
        <h2>Register passkey</h2>

        <input value={name} onChange={ev => setName(ev.target.value)} />

        <button type="submit">Test</button>
      </form>

      <form
        className="flex gap-4 items-center mb-4"
        onSubmit={ev => {
          ev.preventDefault();
          const wallet = getOasisAppWallet();
          wallet?.authenticate('passkey', { username: name });
        }}
      >
        <h2>Login passkey</h2>

        <input value={name} onChange={ev => setName(ev.target.value)} />

        <button type="submit">Test</button>
      </form>

      <form
        className="flex gap-4 items-center mb-4"
        onSubmit={async ev => {
          ev.preventDefault();
          const wallet = getOasisAppWallet();
          await wallet?.register('password', { username: name, password });
        }}
      >
        <h2>Register password</h2>

        <input value={name} placeholder="Username" onChange={ev => setName(ev.target.value)} />
        <input
          value={password}
          placeholder="Password"
          onChange={ev => setPassword(ev.target.value)}
        />

        <button type="submit">Test</button>
      </form>

      <form
        className="flex gap-4 items-center mb-4"
        onSubmit={async ev => {
          ev.preventDefault();
          const wallet = getOasisAppWallet();
          await wallet?.authenticate('password', { username: name, password });
        }}
      >
        <h2>Login password</h2>

        <input value={name} placeholder="Username" onChange={ev => setName(ev.target.value)} />
        <input
          value={password}
          placeholder="Password"
          onChange={ev => setPassword(ev.target.value)}
        />

        <button type="submit">Test</button>
      </form>

      <p className="my-4">
        <button
          onClick={() => {
            const wallet = getOasisAppWallet();
            wallet?.getAccountAddress(name);
          }}
        >
          Get account
        </button>
      </p>

      <form
        className="flex gap-4 items-center mb-4"
        onSubmit={async ev => {
          ev.preventDefault();
          const wallet = getOasisAppWallet();
          await wallet?.sendPlainTransaction({
            strategy: 'passkey',
            authData: {
              username: name,
            },
            tx: {
              to: address,
              data: '0x',
              gasLimit: 1_000_000,
              value: ethers.parseEther(amount),
              nonce: 0,
              chainId: 23295,
              gasPrice: 100_000_000_000,
            },
          });
        }}
      >
        <h2>Send token</h2>

        <input
          value={address}
          placeholder="Receiver Address"
          onChange={ev => setAddress(ev.target.value)}
        />

        <input value={amount} placeholder="Amount" onChange={ev => setAmount(ev.target.value)} />

        <button type="submit">Test</button>

        <button
          type="button"
          onClick={async () => {
            const wallet = getOasisAppWallet();
            await wallet?.sendPlainTransaction({
              strategy: 'passkey',
              authData: {
                username: name,
              },
              tx: {
                to: address,
                data: '0x',
                gasLimit: 1_000_000,
                value: ethers.parseEther(amount),
                nonce: 1,
                chainId: 1287,
                gasPrice: 100_000_000_000,
              },
            });
          }}
        >
          Test crosschain
        </button>
      </form>

      <p className="my-4">
        <button
          onClick={() => {
            const wallet = getOasisAppWallet();
            wallet?.signMessage({
              strategy: 'passkey',
              authData: {
                username: name,
              },
              message: 'Test message 1234',
            });
          }}
        >
          Sign message
        </button>
      </p>

      {/* <p className="my-4">
        <button
          onClick={async () => {
            const contract = new ethers.Contract('0xb1058eD01451B947A836dA3609f88C91804D0663', ERC20Abi);
            const wallet = getOasisAppWallet();

            const tx = await contract.balanceOf.populateTransaction('0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf');

            tx.chainId = 1287n;

            wallet?.sendPlainTransaction({
              strategy: 'passkey',
              authData: { username: name },
              tx
            })
          }}
        >
          Contract method
        </button>
      </p> */}
    </>
  );
}
