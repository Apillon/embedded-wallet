import { useWalletContext } from '../contexts/wallet.context';

export default function WalletNetworkSelect() {
  const { state, dispatch, networks, wallet, reloadUserBalance } = useWalletContext();

  if (!Array.isArray(networks) || !networks.length) {
    return <></>;
  }

  return (
    <select
      name="network"
      value={state.networkId}
      className="text-black"
      onChange={ev => {
        dispatch({ type: 'setValue', payload: { key: 'networkId', value: +ev.target.value } });
        wallet?.setDefaultNetworkId(+ev.target.value);
        reloadUserBalance();
      }}
    >
      {networks.map(network => (
        <option key={network.id} value={network.id}>
          {network.name}
        </option>
      ))}
    </select>
  );
}
