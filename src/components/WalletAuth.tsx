import { useState } from 'react';
import { getOasisAppWallet } from '../../lib/utils';
import { useWalletContext } from '../contexts/wallet.context';
import Btn from './Btn';

export default function WalletAuth() {
  const { dispatch } = useWalletContext();

  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h2>Sign in or Sign up</h2>

      <form
        onSubmit={async ev => {
          ev.preventDefault();

          if (!username) {
            return;
          }

          const wallet = getOasisAppWallet();

          setLoading(true);

          try {
            const address = (await wallet?.userExists(username))
              ? await wallet?.authenticate('passkey', { username })
              : await wallet?.register('passkey', { username });

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

          setLoading(false);
        }}
      >
        <input
          placeholder="your e-mail@email.com"
          value={username}
          className="w-full mb-8"
          onChange={ev => setUsername(ev.target.value)}
        />

        <Btn type="submit" loading={loading} className="w-full">
          Continue
        </Btn>
      </form>
    </div>
  );
}
