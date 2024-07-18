import { useState } from 'react';
import { getEmbeddedWallet } from '../../lib/utils';

export default function TestSign() {
  const [message, setMessage] = useState('Test message 1234');

  return (
    <p className="my-4 flex gap-4 flex-wrap">
      <input type="text" value={message} onChange={ev => setMessage(ev.target.value)} />

      <button
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
