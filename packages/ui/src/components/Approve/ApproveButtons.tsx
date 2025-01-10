import { useState } from 'react';
import Btn from '../ui/Btn';
import { useApproveContext } from '../../contexts/approve.context';
import { useWalletContext } from '../../contexts/wallet.context';
import { UserRejectedRequestError } from '@apillon/wallet-sdk';
import clsx from 'clsx';

export default ({
  doneAfterApprove = false,
  doneAfterDecline = true,
  className,
  onApprove,
  onDecline,
}: {
  doneAfterApprove?: boolean;
  doneAfterDecline?: boolean;
  className?: string;
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
      <div className={clsx('grid grid-cols-2 gap-2', className)}>
        <Btn
          variant="ghost"
          disabled={loading}
          minWidth="0"
          onClick={() => {
            if (onDecline) {
              onDecline();
            }

            if (doneAfterDecline) {
              done();
            }
          }}
        >
          Cancel
        </Btn>

        <Btn
          loading={loading}
          minWidth="0"
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
      </div>
    </>
  );
};
