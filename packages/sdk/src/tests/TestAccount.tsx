import { useState } from 'react';
import { getEmbeddedWallet } from '../../lib/utils';

export default function TestAccount() {
  const [username, setUsername] = useState('test4');

  return (
    <div className="row">
      <input type="text" value={username} onChange={ev => setUsername(ev.target.value)} />

      <button
        onClick={async () => {
          const w = getEmbeddedWallet();
          console.log(await w?.authenticate('passkey', { username }));
        }}
      >
        Login
      </button>

      <button
        onClick={async () => {
          const w = getEmbeddedWallet();
          console.log(await w?.register('passkey', { username }));
        }}
      >
        Register
      </button>
    </div>
  );
}
