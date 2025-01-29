import { useState } from 'react';
import { useWalletContext } from '../../contexts/wallet.context';
import Btn from '../ui/Btn';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import AccountsCurrent from './AccountsCurrent';
import WarningBox from '../ui/WarningBox';
import clsx from 'clsx';
import IconCheckSmall from '../ui/Icon/IconCheckSmall';
import IconCopy from '../ui/Icon/IconCopy';
import HoldToReveal from '../ui/HoldToReveal';

export default () => {
  const { state, dispatch, wallet, goScreenBack, activeWallet } = useWalletContext();
  const { text: copyText, onCopy } = useCopyToClipboard('', '+');

  const [loading, setLoading] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  if (!activeWallet?.address) {
    return <></>;
  }

  const isPrivateKeyLoaded = !!state.privateKeys[activeWallet.address];

  return (
    <div className="pt-10 pb-2 min-h-full flex flex-col">
      <AccountsCurrent noChevron className="mb-6" />

      {/* Private key not loaded yet, must authorize */}
      {!isPrivateKeyLoaded && (
        <>
          <WarningBox
            text="Warning: Your private key protects your assets. Never share it to keep your account secure and prevent unauthorized access."
            className="mb-6"
          />

          <div className="grid grid-cols-2 gap-2">
            <Btn variant="ghost" onClick={() => goScreenBack()}>
              Cancel
            </Btn>

            <Btn
              variant="primary"
              loading={loading}
              onClick={async () => {
                if (loading) {
                  return;
                }

                setLoading(true);

                const pk = await wallet?.getAccountPrivateKey({
                  strategy: 'passkey',
                  walletIndex: activeWallet.index,
                });
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
              Confirm
            </Btn>
          </div>
        </>
      )}

      {/* Private key loaded, hold to reveal */}
      {!!isPrivateKeyLoaded && (
        <>
          <div className="text-sm text-center mb-6">
            <p className="font-bold mb-6">
              Your private key provides full access to your wallet and funds.
            </p>

            <p>
              Do not share this with anyone. Apillon Support will never request this, but phishers
              might.
            </p>
          </div>

          {!isRevealed && (
            <HoldToReveal
              text="Hold to reveal private key"
              onComplete={() => setIsRevealed(true)}
            />
          )}

          {!!isRevealed && (
            <div
              className={clsx(
                'flex flex-col items-center gap-2 text-center mb-6',
                'bg-deepdark p-4 rounded-md'
              )}
            >
              <p className="text-xs text-offwhite font-bold">Your private key</p>

              <p className="text-xs text-lightgrey break-all">
                {state.privateKeys[activeWallet.address]}
              </p>

              <div className="flex justify-center">
                <button
                  className="oaw-button-plain !inline-flex items-center gap-2 !text-yellow"
                  onClick={() => onCopy(state.privateKeys[activeWallet.address])}
                >
                  {copyText === '+' ? <IconCheckSmall /> : <IconCopy />}
                  <span className="text-xs">Copy key</span>
                </button>
              </div>
            </div>
          )}

          <div className="grow"></div>

          {!!isRevealed && (
            <Btn variant="ghost" className="w-full" onClick={() => goScreenBack()}>
              Done
            </Btn>
          )}
        </>
      )}
    </div>
  );
};
