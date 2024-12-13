import { useState } from 'react';
import { useWalletContext } from '../contexts/wallet.context';
import Btn from './Btn';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import Input from './Input';

export default function WalletPKExport() {
  const { state, dispatch, wallet, setScreen } = useWalletContext();
  const { text: copyText, onCopy } = useCopyToClipboard();

  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h3 className="mb-6">Export private key</h3>

      {!state.privateKey && (
        <Btn
          variant="primary"
          loading={loading}
          className="w-full mb-6"
          onClick={async () => {
            if (loading) {
              return;
            }

            setLoading(true);

            const pk = await wallet?.getAccountPrivateKey({ strategy: 'passkey' });
            dispatch({ type: 'setState', payload: { privateKey: pk } });

            setLoading(false);
          }}
        >
          Show private key
        </Btn>
      )}

      {!!state.privateKey && (
        <>
          <Input readOnly value={state.privateKey} className="w-full mb-4" />

          <Btn className="w-full mb-6" onClick={() => onCopy(state.privateKey)}>
            {copyText}
          </Btn>
        </>
      )}

      <Btn variant="ghost" className="w-full" onClick={() => setScreen('main')}>
        Cancel
      </Btn>
    </div>
  );
}
