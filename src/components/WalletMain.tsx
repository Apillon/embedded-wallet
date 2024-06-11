import { useWalletContext } from '../contexts/wallet.context';
import WalletNetworkSelect from './WalletNetworkSelect';
import WalletTransactions from './WalletTransactions';

export default function WalletMain() {
  const { state, dispatch } = useWalletContext();

  return (
    <div>
      <p>{state.address}</p>
      <p>{state.username}</p>
      <p>{state.balance} ETH</p>

      <hr className="my-3" />

      <WalletNetworkSelect />

      <hr className="my-3" />

      <WalletTransactions />

      <hr className="my-3" />

      <button onClick={() => dispatch({ type: 'reset' })}>Disconnect</button>
    </div>
  );
}
