import { useState } from 'react';
import { getEmbeddedWallet } from '../../lib/utils';

export default function TestExport() {
  const [updatedIndex, setUpdatedIndex] = useState(0);

  return (
    <div className="row">
      <input
        type="number"
        value={updatedIndex}
        onChange={ev => setUpdatedIndex(+ev.target.value)}
      />

      <button
        onClick={async () => {
          const wallet = getEmbeddedWallet();

          const res = await wallet?.getAccountPrivateKey({
            strategy: 'passkey',
            walletIndex: updatedIndex,
          });
          console.log(res);
        }}
      >
        TEST
      </button>
    </div>
  );
}
