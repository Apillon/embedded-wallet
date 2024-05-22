import { useState } from 'react';
import { getOasisAppWallet, initializeOnWindow } from '../lib/utils';

initializeOnWindow();

export default function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <form
        className="flex gap-4 items-center mb-4"
        onSubmit={ev => {
          ev.preventDefault();
          const wallet = getOasisAppWallet();
          wallet?.register('passkey', { username: name });
        }}
      >
        <h2>Register passkey</h2>

        <input value={name} onChange={ev => setName(ev.target.value)} />

        <button type="submit">Test</button>
      </form>

      <form
        className="flex gap-4 items-center mb-4"
        onSubmit={ev => {
          ev.preventDefault();
          const wallet = getOasisAppWallet();
          wallet?.login('passkey', { username: name });
        }}
      >
        <h2>Login passkey</h2>

        <input value={name} onChange={ev => setName(ev.target.value)} />

        <button type="submit">Test</button>
      </form>

      <form
        className="flex gap-4 items-center mb-4"
        onSubmit={async ev => {
          ev.preventDefault();
          const wallet = getOasisAppWallet();
          await wallet?.register('password', { username: name, password });
          console.log(wallet?.user);
        }}
      >
        <h2>Register password</h2>

        <input value={name} placeholder="Username" onChange={ev => setName(ev.target.value)} />
        <input
          value={password}
          placeholder="Password"
          onChange={ev => setPassword(ev.target.value)}
        />

        <button type="submit">Test</button>
      </form>

      <form
        className="flex gap-4 items-center mb-4"
        onSubmit={async ev => {
          ev.preventDefault();
          const wallet = getOasisAppWallet();
          await wallet?.login('password', { username: name, password });
          console.log(wallet?.user);
        }}
      >
        <h2>Login password</h2>

        <input value={name} placeholder="Username" onChange={ev => setName(ev.target.value)} />
        <input
          value={password}
          placeholder="Password"
          onChange={ev => setPassword(ev.target.value)}
        />

        <button type="submit">Test</button>
      </form>

      <p>
        <button
          onClick={() => {
            const wallet = getOasisAppWallet();
            wallet?.getAccountAddress(name);
          }}
        >
          Get account
        </button>
      </p>
    </>
  );
}
