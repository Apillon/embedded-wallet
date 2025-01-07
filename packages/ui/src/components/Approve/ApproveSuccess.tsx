import { useApproveContext } from '../../contexts/approve.context';
import { useWalletContext } from '../../contexts/wallet.context';
import Btn from '../ui/Btn';
import IconCheckCircle from '../ui/IconCheckCircle';

export default () => {
  const { setStateValue: setForWallet } = useWalletContext();
  const {
    state: { successInfo },
  } = useApproveContext();

  if (!successInfo) {
    return <></>;
  }

  return (
    <div>
      <h3 className="mb-4 flex gap-4">
        <IconCheckCircle />
        {successInfo.title}
      </h3>

      {!!successInfo.txHash && (
        <p className="break-words text-sm text-lightgrey mb-4">
          Transaction has been completed with the following hash:{' '}
          <span className="text-offwhite">{successInfo.txHash}</span>
        </p>
      )}

      {!!successInfo.explorerUrl && (
        <p className="text-sm mb-4">
          <a
            href={successInfo.explorerUrl}
            target="_blank"
            className="text-yellow hover:text-offwhite"
          >
            View on blockchain explorer
          </a>
        </p>
      )}

      <Btn variant="ghost" className="w-full mt-12" onClick={() => setForWallet('isOpen', false)}>
        Close
      </Btn>
    </div>
  );
};
