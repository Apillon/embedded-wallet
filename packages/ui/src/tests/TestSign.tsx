import { useState } from 'react';
import { getEmbeddedWallet } from '@apillon/wallet-sdk';

export default function TestSign() {
  const [message, setMessage] = useState('Test message 1234');

  return (
    <p className="row">
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
