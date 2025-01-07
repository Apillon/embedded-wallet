import { useApproveContext } from '../../contexts/approve.context';
import { useWalletContext } from '../../contexts/wallet.context';
import ApproveButtons from './ApproveButtons';

export default () => {
  const { networksById, setStateValue: setForWallet } = useWalletContext();
  const {
    state: { targetChain },
  } = useApproveContext();

  if (!targetChain) {
    return <></>;
  }

  const chainId = targetChain.chainId;

  return (
    <div className="mt-2">
      <h2 className="mb-6">Switch chain</h2>

      <p className="mb-4">
        You have to switch the connected wallet chain to continue with the transaction.
      </p>

      {!!chainId && !!networksById?.[chainId] && (
        <p>
          Switching to <strong>{networksById[chainId].name}</strong> (chain ID:{' '}
          {networksById[chainId].id})
        </p>
      )}

      <ApproveButtons
        onApprove={() => {
          targetChain?.resolve(true);
          setForWallet('networkId', chainId);
        }}
        onDecline={() => {
          targetChain?.resolve(false);
        }}
      />
    </div>
  );
};
