import { useState } from 'react';
import { ethers } from 'ethers';
import { getOasisAppWallet, ERC20Abi } from '@oasis-app-wallet/sdk';

export default function Demo() {
  const [message, setMessage] = useState('Hello from Apillon!');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const inputClass =
    'rounded-lg border border-lightgrey/25 bg-lightdark text-offwhite px-5 py-3 outline-none focus:border-lightgrey';

  const btnClass =
    'relative rounded-lg text-sm font-bold border-b-[4px] border-t-[4px] !bg-yellow ' +
    'px-4 py-2.5 min-w-[160px] ' +
    'transition-all hover:border-b-blue/50 hover:translate-y-[-2px] focus:translate-y-px focus:border-b-yellow/50 ' +
    'bg-lightdark text-dark border-b-lightdark border-t-lightdark';

  return (
    <div className="text-offwhite  px-4 py-4 max-w-lg w-[767px] mt-10">
      <p className="my-4 flex gap-4 flex-col">
        <input
          type="text"
          value={message}
          className={inputClass}
          onChange={ev => setMessage(ev.target.value)}
        />

        <button
          className={btnClass}
          onClick={async () => {
            const wallet = getOasisAppWallet();
            const msg = await wallet?.signMessage({
              mustConfirm: true,
              strategy: 'passkey',
              message,
            });
            console.log(msg);
          }}
        >
          Sign message
        </button>
      </p>

      <br />
        <form
          className="my-4 flex gap-4 flex-col mt-16"
          onSubmit={async ev => {
            ev.preventDefault();
            const wallet = getOasisAppWallet();

            await wallet?.signContractWrite({
              mustConfirm: true,
              strategy: 'passkey',
              contractAbi: ERC20Abi,
              contractAddress: '0xb1058eD01451B947A836dA3609f88C91804D0663',
              contractFunctionName: 'transfer',
              contractFunctionValues: [address, ethers.parseEther(amount)],
              chainId: 1287,
            });
          }}
        >
          <input
            value={address}
            placeholder="Receiver Address"
            className={inputClass}
            onChange={ev => setAddress(ev.target.value)}
          />

          <input
            value={amount}
            placeholder="Amount"
            className={inputClass}
            onChange={ev => setAmount(ev.target.value)}
          />

          <div className="flex flex-row">
            <button
              type="button"
              className={btnClass + ' w-1/2'}
              onClick={async () => {
                const wallet = getOasisAppWallet();
                await wallet?.signPlainTransaction({
                  mustConfirm: true,
                  strategy: 'passkey',
                  tx: {
                    to: address,
                    data: '0x',
                    gasLimit: 1_000_000,
                    value: ethers.parseEther(amount),
                    chainId: 23295, // 1287,
                    gasPrice: 100_000_000_000,
                  },
                });
              }}
            >
              Plain Transfer
            </button>
            <button
              type="button"
              className={btnClass + ' w-1/2 ml-4'}
              onClick={async () => {
                const wallet = getOasisAppWallet();
                await wallet?.signPlainTransaction({
                  mustConfirm: true,
                  strategy: 'passkey',
                  tx: {
                    to: address,
                    data: '0x',
                    gasLimit: 1_000_000,
                    value: ethers.parseEther(amount),
                    chainId: 1287,
                    gasPrice: 100_000_000_000,
                  },
                });
              }}
            >
              Cross-chain Transfer
            </button>
          </div>
        </form>
    </div>
  );
}
