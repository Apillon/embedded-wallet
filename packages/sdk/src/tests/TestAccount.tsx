import { useState } from 'react';
import { getEmbeddedWallet } from '../../lib/utils';

export default function TestAccount({ pw = false }: { pw?: boolean }) {
  const [username, setUsername] = useState('test7');
  const [password, setPassword] = useState('1234');

  return (
    <div className="row">
      <input type="text" value={username} onChange={ev => setUsername(ev.target.value)} />
      {!!pw && <input type="text" value={password} onChange={ev => setPassword(ev.target.value)} />}

      <button
        onClick={async () => {
          const w = getEmbeddedWallet();
          if (pw) {
            console.log(await w?.authenticate('password', { username, password }));
          } else {
            console.log(await w?.authenticate('passkey', { username }));
          }
        }}
      >
        Login
      </button>

      <button
        onClick={async () => {
          const w = getEmbeddedWallet();
          if (pw) {
            console.log(await w?.register('password', { username, password }));
          } else {
            console.log(await w?.register('passkey', { username }));
          }
        }}
      >
        Register
      </button>
    </div>
  );
}
