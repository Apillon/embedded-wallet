import { useWalletContext } from '../../contexts/wallet.context';
import Btn from '../ui/Btn';
import Loader from '../ui/Loader';

export default function AccountsReload() {
  const { loadAccountWallets, state } = useWalletContext();

  return (
    <div>
      <h2 className="mb-6">Accounts out of date</h2>

      <div className="text-center mb-4">
        <Loader size={56} />
      </div>

      <p className="text-sm text-lightgrey mb-6 text-center">
        Please authenticate to load your accounts.
      </p>

      <Btn
        variant="ghost"
        disabled={state.loadingWallets}
        className="w-full"
        onClick={() => loadAccountWallets()}
      >
        Reload
      </Btn>
    </div>
  );
}
