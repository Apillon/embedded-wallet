import { useState } from 'react';
import { getOasisAppWallet } from '../../lib/utils';
import { useWalletContext } from '../contexts/wallet.context';

export default function WalletAuth({
  initialMode = 'signin',
}: {
  initialMode?: 'signin' | 'signup';
}) {
  const { dispatch } = useWalletContext();

  const [username, setUsername] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  return (
    <div>
      {mode === 'signin' && (
        <div>
          <h2>Sign in</h2>

          <form
            onSubmit={async ev => {
              ev.preventDefault();

              const wallet = getOasisAppWallet();

              try {
                const address = await wallet?.authenticate('passkey', { username });

                if (address) {
                  const balance = await wallet?.getAccountBalance(address.publicAddress as string);

                  dispatch({
                    type: 'setState',
                    payload: {
                      address: address.publicAddress as string,
                      username,
                      balance,
                      authStrategy: 'passkey',
                    },
                  });
                }
              } catch (e) {
                console.error(e);
              }
            }}
          >
            <input
              placeholder="Username"
              value={username}
              onChange={ev => setUsername(ev.target.value)}
            />

            <button type="submit">Sign in</button>
          </form>
          <button onClick={() => setMode('signup')}>Sign up</button>
        </div>
      )}

      {mode === 'signup' && (
        <div>
          <h2>Sign up</h2>

          <form
            onSubmit={async ev => {
              ev.preventDefault();

              const wallet = getOasisAppWallet();

              try {
                const address = await wallet?.register('passkey', { username });

                if (address) {
                  const balance = await wallet?.getAccountBalance(address.publicAddress as string);

                  dispatch({
                    type: 'setState',
                    payload: {
                      address: address.publicAddress as string,
                      username,
                      balance,
                      authStrategy: 'passkey',
                    },
                  });
                }
              } catch (e) {
                console.error(e);
              }
            }}
          >
            <input
              placeholder="Username"
              value={username}
              onChange={ev => setUsername(ev.target.value)}
            />

            <button type="submit">Sign up</button>
          </form>

          <button onClick={() => setMode('signin')}>Sign in</button>
        </div>
      )}
    </div>
  );
}
