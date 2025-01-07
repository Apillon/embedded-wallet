import { useWalletContext } from '../../contexts/wallet.context';
import Btn from '../ui/Btn';

export default function WalletNetworkSelect() {
  const { state, dispatch, networks, wallet, setScreen } = useWalletContext();

  if (!Array.isArray(networks) || !networks.length) {
    return <></>;
  }

  function selectNetwork(networkId: number) {
    dispatch({ type: 'setValue', payload: { key: 'networkId', value: networkId } });
    wallet?.setDefaultNetworkId(networkId);
    setScreen('main');
  }

  return (
    <div>
      <Btn variant="primary" className="w-full mb-6" onClick={() => setScreen('selectAccounts')}>
        Accounts
      </Btn>

      <Btn variant="primary" className="w-full mb-6" onClick={() => setScreen('exportPrivateKey')}>
        Export private key
      </Btn>

      <Btn
        variant="primary"
        className="w-full mb-6"
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
        Disconnect wallet
      </Btn>

      <h2 className="mb-4">Select network</h2>

      <div className="flex flex-col gap-3 mb-6">
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

      <Btn variant="ghost" className="w-full" onClick={() => setScreen('main')}>
        Cancel
      </Btn>
    </div>
  );
}
