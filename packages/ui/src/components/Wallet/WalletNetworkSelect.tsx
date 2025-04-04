import { useState } from 'react';
import { useWalletContext } from '../../contexts/wallet.context';
import InputSearch from '../ui/InputSearch';
import clsx from 'clsx';
import { WalletType } from '@apillon/wallet-sdk';

export default function WalletNetworkSelect() {
  const { state, dispatch, networks, wallet, setScreen, activeWallet } = useWalletContext();
  const [search, setSearch] = useState('');

  if (!Array.isArray(networks) || !networks.length) {
    return <></>;
  }

  function selectNetwork(networkId: number | string) {
    if (networkId === state.networkId) {
      return;
    }

    dispatch({ type: 'setValue', payload: { key: 'networkId', value: networkId } });
    wallet?.setDefaultNetworkId(networkId);
    setScreen('main');
  }

  return (
    <div>
      <InputSearch value={search} onChange={ev => setSearch(ev)} className="my-6" />

      <div className="flex flex-col gap-3">
        {networks
          .filter(network => {
            const envCheck =
              activeWallet?.walletType === WalletType.SUBSTRATE
                ? typeof network.id === 'string'
                : typeof network.id === 'number';
            return envCheck && network.name.toLowerCase().includes(search.toLowerCase());
          })
          .map(network => (
            <button
              key={network.id}
              disabled={network.id === state.networkId}
              className={clsx(
                'oaw-button-plain !px-4 !py-[0.6875rem] !rounded-md !flex items-center gap-4 !bg-primarylight',
                '!border !border-solid border-transparent !transition-colors',
                'hover:border-darkgrey',
                {
                  '!border-yellow !cursor-not-allowed': network.id === state.networkId,
                }
              )}
              onClick={() => selectNetwork(network.id)}
            >
              <img
                src={
                  network?.imageUrl ||
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='
                }
                alt={network.name}
                className="w-6 h-6 rounded-full"
              />

              <span className="text-sm font-normal text-offwhite">{network.name}</span>
            </button>
          ))}
      </div>
    </div>
  );
}
