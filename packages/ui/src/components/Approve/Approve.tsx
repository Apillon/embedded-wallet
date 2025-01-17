import { useEffect, useRef } from 'react';
import { useApproveContext } from '../../contexts/approve.context';
import { useWalletContext } from '../../contexts/wallet.context';
import ApproveChainChange from './ApproveChainChange';
import ApproveContractTx from './ApproveContractTx';
import ApprovePlainTx from './ApprovePlainTx';
import ApproveSignMessage from './ApproveSignMessage';

export default () => {
  const {
    state: { walletScreen },
  } = useWalletContext();
  const { state, onApproveDone } = useApproveContext();
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
