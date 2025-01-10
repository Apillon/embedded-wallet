import { useApproveContext } from '../../contexts/approve.context';
import { useWalletContext } from '../../contexts/wallet.context';
import WarningBox from '../ui/WarningBox';
import ApproveButtons from './ApproveButtons';
import ApproveDataRow from './ApproveDataRow';

export default () => {
  const { networksById, setStateValue: setForWallet } = useWalletContext();
  const {
    state: { targetChain },
    setStateValue: setForApprove,
  } = useApproveContext();

  if (!targetChain) {
    return <></>;
  }

  const chainId = targetChain.chainId;

  return (
    <div className="flex flex-col min-h-full pb-2">
      <h3 className="my-6">Switch chain</h3>

      {!!chainId && !!networksById?.[chainId] && (
        <ApproveDataRow
          label="Switch to"
          data={`${networksById[chainId].name} (chain ID: ${networksById[chainId].id})`}
          className="mb-4"
        />
      )}

      <WarningBox
        text="You have to switch the network to continue with the transaction."
        className="mb-6"
      />

      <div className="grow"></div>

      <ApproveButtons
        onApprove={() => {
          targetChain?.resolve(true);
          setForApprove('targetChain', undefined);
          setForWallet('networkId', chainId);
        }}
        onDecline={() => {
          targetChain?.resolve(false);
        }}
      />
    </div>
  );
};
