import Btn from '../ui/Btn';
import { useWalletContext } from '../../contexts/wallet.context';
import Loader from '../ui/Loader';
import AuthTitle from '../Auth/AuthTitle';

export default () => {
  const { loadAccountWallets, state, dispatch, setScreen, wallet } = useWalletContext();

  return (
    <div className="p-8 sm:p-12">
      <AuthTitle
        title="Accounts unavailable"
        description="Please authenticate again to load your accounts."
        header={<Loader size={56} />}
      />

      <Btn
        variant="primary"
        disabled={state.loadingWallets}
        className="w-full mb-3"
        onClick={() => loadAccountWallets()}
      >
        Authenticate
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
        Cancel
      </Btn>
    </div>
  );
};
