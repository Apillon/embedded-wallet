import { useWalletContext } from '../contexts/wallet.context';
import Btn from './Btn';

export default function WalletNetworkSelect() {
  const { state, dispatch, networks, wallet, reloadUserBalance, setScreen } = useWalletContext();

  if (!Array.isArray(networks) || !networks.length) {
    return <></>;
  }

  function selectNetwork(networkId: number) {
    dispatch({ type: 'setValue', payload: { key: 'networkId', value: networkId } });
    wallet?.setDefaultNetworkId(networkId);
    reloadUserBalance();
    setScreen('main');
  }

  return (
    <div>
      <h2 className="mb-4">Select network</h2>

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
    </div>
  );
}
