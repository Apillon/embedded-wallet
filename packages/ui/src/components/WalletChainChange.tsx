import { useWalletContext } from '../contexts/wallet.context';
import Btn from './Btn';
import WalletError from './WalletError';

export default function WalletChainChange({
  chainId,
  onSuccess,
  onDecline,
}: {
  chainId: number;
  onSuccess: () => void;
  onDecline: () => void;
}) {
  const { networksById } = useWalletContext();

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

      {/* Error */}
      <WalletError show className="mt-6 -mb-6" />

      <div className="mt-12 flex gap-4">
        <Btn className="w-full" onClick={onSuccess}>
          Approve
        </Btn>

        <Btn variant="secondary" className="w-full" onClick={onDecline}>
          Cancel
        </Btn>
      </div>
    </div>
  );
}
