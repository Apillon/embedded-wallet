// import { useState } from 'react';
import Btn from './Btn';
import Spinner from './Spinner';
import { useWalletContext } from '../contexts/wallet.context';

export default function WalletLoad() {
  const { loadAccountWallets, handleError, state } = useWalletContext();
  // const [loading, setLoading] = useState(false);

  async function loadAccounts() {
    if (state.loadingWallets) {
      return;
    }

    // setLoading(true);

    try {
      await loadAccountWallets();
    } catch (e) {
      handleError(e);
    }

    // setLoading(false);
  }
  return (
    <div className="mt-2">
      <h2 className="mb-6">Accounts unavailable</h2>

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
        onClick={() => loadAccounts()}
      >
        Retry
      </Btn>
    </div>
  );
}
