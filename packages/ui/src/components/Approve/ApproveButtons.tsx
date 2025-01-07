import { useState } from 'react';
import Btn from '../ui/Btn';
import { useApproveContext } from '../../contexts/approve.context';
import { useWalletContext } from '../../contexts/wallet.context';
import { UserRejectedRequestError } from '@apillon/wallet-sdk';

export default ({
  doneAfterApprove = false,
  doneAfterDecline = true,
  onApprove,
  onDecline,
}: {
  doneAfterApprove?: boolean;
  doneAfterDecline?: boolean;
  onApprove: () => Promise<void> | void;
  onDecline?: () => void;
}) => {
  const {
    state: { walletScreenHistory },
    setStateValue: setForWallet,
    handleError,
  } = useWalletContext();
  const { state: approveState, dispatch: dispatchApprove } = useApproveContext();

  const [loading, setLoading] = useState(false);

  // Close wallet modal if wallet was not opened before approve action.
  function done(success = false) {
    if (walletScreenHistory.length) {
      if (!success) {
        if (!approveState.successInfo?.title) {
          if (approveState.approveParams?.contractWrite?.reject) {
            approveState.approveParams.contractWrite.reject(new UserRejectedRequestError());
          } else if (approveState.approveParams?.plain?.reject) {
            approveState.approveParams.plain.reject(new UserRejectedRequestError());
          } else if (approveState.approveParams?.signature?.reject) {
            approveState.approveParams.signature.reject(new UserRejectedRequestError());
          }
        }
      }

      dispatchApprove({ type: 'reset' });
    } else {
      setForWallet('isOpen', false);
    }
  }

  return (
    <>
      <div className="mt-6">
        <Btn
          loading={loading}
          className="w-full mb-4"
          onClick={async () => {
            if (!!loading) {
              return;
            }

            setLoading(true);
            handleError();

            try {
              await onApprove();

              if (doneAfterApprove) {
                done(true);
              }
            } catch (e) {
              const errMsg = handleError(e);

              // Transaction was already broadcast
              if (errMsg === 'already known') {
                done();
              }
            }

            setLoading(false);
          }}
        >
          Approve
        </Btn>

        <Btn
          variant="ghost"
          disabled={loading}
          className="w-full"
          onClick={() => {
            if (onDecline) {
              onDecline();
            }

            if (doneAfterDecline) {
              done();
            }
          }}
        >
          Reject
        </Btn>
      </div>

      {/* <div className="mt-4 text-center text-xs">
        <button
          onClick={() => {
            wallet?.setAccount({
              username: '',
              walletIndex: 0,
              contractAddress: '',
              strategy: 'passkey',
            });

            dispatch({
              type: 'setState',
              payload: {
                username: '',
                walletIndex: 0,
                contractAddress: '',
                authStrategy: 'passkey',
              },
            });
          }}
        >
          Use another account
        </button>
      </div> */}
    </>
  );
};
