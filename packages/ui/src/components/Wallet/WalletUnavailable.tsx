import Btn from '../ui/Btn';
import { useWalletContext } from '../../contexts/wallet.context';
import Loader from '../ui/Loader';

export default () => {
  const { loadAccountWallets, state, dispatch, setScreen, wallet } = useWalletContext();

  return (
    <div className="mt-2">
      <h2 className="mb-6">Accounts unavailable</h2>

      <div className="text-center mb-4">
        <Loader size={56} />
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
};
