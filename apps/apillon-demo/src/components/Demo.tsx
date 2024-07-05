import { useState } from 'react';
import { getOasisAppWallet } from '@oasis-app-wallet/sdk';

export default function Demo() {
  const [message, setMessage] = useState('Hello from Apillon!');

  const inputClass =
    'rounded-lg border border-lightgrey/25 bg-lightdark text-offwhite px-5 py-3 outline-none focus:border-lightgrey';

  const btnClass =
    'relative rounded-lg text-sm font-bold border-b-[4px] border-t-[4px] !bg-yellow ' +
    'px-4 py-2.5 min-w-[160px] ' +
    'transition-all hover:border-b-blue/50 hover:translate-y-[-2px] focus:translate-y-px focus:border-b-yellow/50 ' +
    'bg-lightdark text-dark border-b-yellow border-t-yellow';

  return (
    <div className="text-offwhite max-w-[767px] w-full mt-10">
      <form
        className="my-4 flex gap-4 flex-col"
        onSubmit={async ev => {
          ev.preventDefault();
          const wallet = getOasisAppWallet();
          const msg = await wallet?.signMessage({
            mustConfirm: true,
            strategy: 'passkey',
            message,
          });
          console.log(msg);
        }}
      >
        <input
          type="text"
          value={message}
          className={inputClass}
          onChange={ev => setMessage(ev.target.value)}
        />

        <button type="submit" className={btnClass}>
          Sign message
        </button>
      </form>
    </div>
  );
}
