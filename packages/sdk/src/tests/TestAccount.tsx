import { useState } from 'react';
import { getEmbeddedWallet } from '../../lib/utils';

export default function TestAccount() {
  const [username, setUsername] = useState('test4');
  const [password, setPassword] = useState('1234');

  return (
    <div className="row">
      <input type="text" value={username} onChange={ev => setUsername(ev.target.value)} />
      <input type="text" value={password} onChange={ev => setPassword(ev.target.value)} />

      <button
        onClick={async () => {
          const w = getEmbeddedWallet();
          console.log(await w?.authenticate('password', { username, password }));
        }}
      >
        Login
      </button>

      <button
        onClick={async () => {
          const w = getEmbeddedWallet();
          console.log(await w?.register('password', { username, password }));
        }}
      >
        Register
      </button>
    </div>
  );
}
