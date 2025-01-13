import { useApproveContext } from '../../contexts/approve.context';
import AuthTitle from '../Auth/AuthTitle';
import Btn from '../ui/Btn';
import IconCheckCircle from '../ui/IconCheckCircle';

export default () => {
  const {
    state: { successInfo },
    onApproveDone,
  } = useApproveContext();

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
            Transaction has been completed with the following hash:
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
