import { useWalletContext } from '../contexts/wallet.context';
import Btn from './Btn';
import Spinner from './Spinner';

export default function AccountsReload() {
  const { loadAccountWallets, state } = useWalletContext();

  return (
    <div>
      <div className="text-center mb-4">
        <Spinner size={56} className="mx-auto" />
      </div>

      <p className="text-sm text-lightgrey mb-6">
        Please authenticate again to load your accounts.
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
