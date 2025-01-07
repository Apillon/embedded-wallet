import { useState } from 'react';
import { useWalletContext } from '../../contexts/wallet.context';
import Btn from '../ui/Btn';
import Input from '../ui/Input';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';

export default () => {
  const { state, dispatch, wallet, setScreen, activeWallet } = useWalletContext();
  const { text: copyText, onCopy } = useCopyToClipboard();

  const [loading, setLoading] = useState(false);

  if (!activeWallet?.address) {
    return <></>;
  }

  return (
    <div>
      <h3 className="mb-6">Export private key</h3>

      {!state.privateKeys[activeWallet.address] && (
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
            dispatch({
              type: 'setValue',
              payload: {
                key: 'privateKeys',
                value: { ...state.privateKeys, [activeWallet.address]: pk },
              },
            });

            setLoading(false);
          }}
        >
          Show private key
        </Btn>
      )}

      {!!state.privateKeys[activeWallet.address] && (
        <>
          <Input readOnly value={state.privateKeys[activeWallet.address]} className="w-full mb-4" />

          <Btn
            className="w-full mb-6"
            onClick={() => onCopy(state.privateKeys[activeWallet.address])}
          >
            {copyText}
          </Btn>
        </>
      )}

      <Btn variant="ghost" className="w-full" onClick={() => setScreen('main')}>
        Cancel
      </Btn>
    </div>
  );
};
