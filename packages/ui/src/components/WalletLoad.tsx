import Btn from './Btn';
import Spinner from './Spinner';
import { useWalletContext } from '../contexts/wallet.context';

export default function WalletLoad() {
  const { loadAccountWallets, state, dispatch, setScreen, wallet } = useWalletContext();

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
        className="w-full mb-3"
        onClick={() => loadAccountWallets()}
      >
        Retry
      </Btn>

      <Btn
        variant="ghost"
        disabled={state.loadingWallets}
        className="w-full"
        onClick={() => {
          dispatch({ type: 'reset' });

          wallet?.setAccount({
            username: '',
            walletIndex: 0,
            contractAddress: '',
            strategy: 'passkey',
            wallets: [],
          });

          setScreen('main');
        }}
      >
        Abort
      </Btn>
    </div>
  );
}
