import { useApproveContext } from '../../contexts/approve.context';
import ApproveChainChange from './ApproveChainChange';
import ApproveContractTx from './ApproveContractTx';
import ApprovePlainTx from './ApprovePlainTx';
import ApproveSignMessage from './ApproveSignMessage';

export default () => {
  const { state } = useApproveContext();

  if (!!state.targetChain) {
    return <ApproveChainChange />;
  }

  if (!!state.messageToSign) {
    return <ApproveSignMessage />;
  }

  if (!!state.txToConfirm) {
    return <ApprovePlainTx />;
  }

  if (!!state.contractFunctionData) {
    return <ApproveContractTx />;
  }

  return <></>;
};
