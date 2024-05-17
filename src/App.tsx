import { useState } from 'react';
import { getOasisAppWallet, initializeOnWindow } from '../lib/utils';

initializeOnWindow();

export default function App() {
  const [name, setName] = useState('');

  return (
    <>
      <div>
        <input value={name} onChange={ev => setName(ev.target.value)} />
        <button
          onClick={() => {
            const wallet = getOasisAppWallet();
            wallet?.register('passkey', { username: name });
          }}
        >
          Test
        </button>
      </div>
    </>
  );
}
