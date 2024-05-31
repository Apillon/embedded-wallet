import { useWalletContext } from '../contexts/wallet.context';

export default function WalletMain() {
  const { state, dispatch } = useWalletContext();

  return (
    <div>
      <p>{state.address}</p>
      <p>{state.username}</p>
      <p>{state.balance} ROSE</p>
      <button onClick={() => dispatch({ type: 'reset' })}>Disconnect</button>
    </div>
  );
}
