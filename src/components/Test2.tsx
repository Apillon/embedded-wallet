import { useState } from 'react';
import { getOasisAppWallet } from '../../lib/utils';
import { ERC20Abi } from '../../lib/abi';
import { ethers } from 'ethers';

export default function Test2() {
  const [message, setMessage] = useState('Test message 1234');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const inputClass =
    'rounded-lg border border-lightgrey/25 bg-lightdark text-offwhite px-5 py-3 outline-none focus:border-lightgrey';

  const btnClass =
    'relative rounded-lg text-sm font-bold border-b-[4px] border-t-[4px] ' +
    'px-4 py-2.5 min-w-[160px] ' +
    'transition-all hover:border-b-blue/50 hover:translate-y-[-2px] focus:translate-y-px focus:border-b-yellow/50 ' +
    'bg-lightdark text-offwhite border-b-lightdark border-t-lightdark';

  return (
    <div className="text-offwhite">
      <p className="my-4 flex gap-4">
        <input
          type="text"
          value={message}
          className={inputClass}
          onChange={ev => setMessage(ev.target.value)}
        />

        <button
          className={btnClass}
          onClick={() => {
            const wallet = getOasisAppWallet();
            wallet?.signMessage({
              mustConfirm: true,
              strategy: 'passkey',
              message,
            });
          }}
        >
          Sign message
        </button>
      </p>

      <form
        className="my-4 flex items-center gap-4"
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

        <button type="submit" className={btnClass}>
          ERC20 Transfer
        </button>
      </form>
    </div>
  );
}
