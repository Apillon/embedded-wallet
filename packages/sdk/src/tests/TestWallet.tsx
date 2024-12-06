import { useState } from 'react';
import { getEmbeddedWallet } from '../../lib/utils';

export default function TestWallet() {
  const [title, setTitle] = useState('wallet title 1');
  const [pk, setPK] = useState('');

  const [updatedTitle, setUpdatedTitle] = useState('my updated title');
  const [updatedIndex, setUpdatedIndex] = useState(0);

  return (
    <>
      <div className="row">
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} />

        <input
          type="text"
          value={pk}
          placeholder="Private key to import"
          onChange={ev => setPK(ev.target.value)}
        />

        <button
          onClick={() => {
            const w = getEmbeddedWallet();

            w?.addAccountWallet({
              title,
              privateKey: !!pk ? pk : undefined,
              // strategy: 'password',
              // authData: {
              //   username: 'test1',
              //   password: '1234',
              // },
            });
          }}
        >
          Add now
        </button>
      </div>

      <div className="row">
        <input type="text" value={updatedTitle} onChange={ev => setUpdatedTitle(ev.target.value)} />
        <input
          type="number"
          value={updatedIndex}
          onChange={ev => setUpdatedIndex(+ev.target.value)}
        />

        <button
          onClick={() => {
            const w = getEmbeddedWallet();
            w?.updateAccountWalletTitle({
              walletIndex: updatedIndex,
              title: updatedTitle,
            });
          }}
        >
          Update title
        </button>
      </div>
    </>
  );
}
