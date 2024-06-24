import { useWalletContext } from '../contexts/wallet.context';
import Btn from './Btn';

export default function WalletNetworkSelect() {
  const { state, dispatch, networks, wallet, reloadUserBalance } = useWalletContext();

  if (!Array.isArray(networks) || !networks.length) {
    return <></>;
  }

  function selectNetwork(networkId: number) {
    dispatch({ type: 'setValue', payload: { key: 'networkId', value: networkId } });
    wallet?.setDefaultNetworkId(networkId);
    reloadUserBalance();
    dispatch({ type: 'setValue', payload: { key: 'walletScreen', value: 'main' } });
  }

  return (
    <div className="flex flex-col gap-3">
      {networks.map(network => (
        <Btn
          key={network.id}
          variant="secondary"
          disabled={network.id === state.networkId}
          onClick={() => selectNetwork(network.id)}
        >
          {network.name}
        </Btn>
      ))}
    </div>
  );
}
