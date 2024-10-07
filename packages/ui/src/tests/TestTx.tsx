import { getEmbeddedWallet } from '@apillon/wallet-sdk';
import { useState } from 'react';

export default function TestTx() {
  const [loading, setLoading] = useState(false);

  return (
    <p className="row">
      <button
        onClick={async () => {
          setLoading(true);

          try {
            const wallet = getEmbeddedWallet();
            const msg = await wallet?.signPlainTransaction({
              mustConfirm: true,
              strategy: 'passkey',
              tx: {
                to: '0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf',
                value: '10000000',
                chainId: 1287,
              },
            });
            console.log(msg);
          } catch (e) {
            console.error(e);
          }

          setLoading(false);
        }}
      >
        Plain TX {loading && '...'}
      </button>
    </p>
  );
}
