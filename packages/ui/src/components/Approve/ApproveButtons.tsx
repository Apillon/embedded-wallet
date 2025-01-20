import { useState } from 'react';
import Btn from '../ui/Btn';
import { useApproveContext } from '../../contexts/approve.context';
import { useWalletContext } from '../../contexts/wallet.context';
import clsx from 'clsx';

export default ({
  doneAfterApprove = true,
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
  const { handleError } = useWalletContext();
  const { onApproveDone } = useApproveContext();

  const [loading, setLoading] = useState(false);

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
              onApproveDone();
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
                onApproveDone(true);
              }
            } catch (e) {
              const errMsg = handleError(e);

              // Transaction was already broadcast
              if (errMsg === 'already known') {
                onApproveDone();
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
