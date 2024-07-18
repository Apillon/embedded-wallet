import { useState } from 'react';
import { getEmbeddedWallet } from '@embedded-wallet/sdk';

export default function TestSign() {
  const [message, setMessage] = useState('Test message 1234');

  const inputClass =
    'rounded-lg border border-lightgrey/25 bg-lightdark text-offwhite px-5 py-3 outline-none focus:border-lightgrey';

  const btnClass =
    'relative rounded-lg text-sm font-bold border-b-[4px] border-t-[4px] ' +
    'px-4 py-2.5 min-w-[160px] ' +
    'transition-all hover:border-b-blue/50 hover:translate-y-[-2px] focus:translate-y-px focus:border-b-yellow/50 ' +
    'bg-lightdark text-offwhite border-b-lightdark border-t-lightdark';

  return (
    <p className="my-4 flex gap-4 flex-wrap">
      <input
        type="text"
        value={message}
        className={inputClass}
        onChange={ev => setMessage(ev.target.value)}
      />

      <button
        className={btnClass}
        onClick={async () => {
          const wallet = getEmbeddedWallet();
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
  );
}
