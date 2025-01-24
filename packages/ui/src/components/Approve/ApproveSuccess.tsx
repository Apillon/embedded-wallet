import { useEffect, useRef } from 'react';
import { useApproveContext } from '../../contexts/approve.context';
import AuthTitle from '../Auth/AuthTitle';
import Btn from '../ui/Btn';
import IconCheckCircle from '../ui/Icon/IconCheckCircle';
import { useWalletContext } from '../../contexts/wallet.context';

export default () => {
  const {
    state: { walletScreen },
  } = useWalletContext();
  const {
    state: { successInfo },
    onApproveDone,
  } = useApproveContext();
  const isApproveScreen = useRef(false);

  /**
   * Reject request if user navigates away from approve screen.
   */
  useEffect(() => {
    if (isApproveScreen.current && walletScreen !== 'approve') {
      onApproveDone();
    } else if (walletScreen === 'approve') {
      isApproveScreen.current = true;
    }
  }, [walletScreen]);

  if (!successInfo) {
    return <></>;
  }

  return (
    <div className="pt-12 pb-2">
      <AuthTitle
        title={successInfo.title}
        header={<IconCheckCircle />}
        titleClass="text-xl"
        headerClass="!mb-4"
        className="!mb-4"
      />

      {!!successInfo.txHash && (
        <p className="break-words text-sm text-center">
          <span className="text-lightgrey">
            Transaction has been submitted with the following hash:
          </span>{' '}
          <br />
          <span className="text-offwhite">{successInfo.txHash}</span>
        </p>
      )}

      <div className="mt-12">
        <Btn variant="ghost" href={successInfo.explorerUrl} blank className="w-full mb-3">
          View on blockchain explorer
        </Btn>

        <Btn variant="primary" className="w-full" onClick={() => onApproveDone(true)}>
          Close
        </Btn>
      </div>
    </div>
  );
};
