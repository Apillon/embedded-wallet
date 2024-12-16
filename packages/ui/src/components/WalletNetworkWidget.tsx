import clsx from 'clsx';
import IconEthereum from './IconEthereum';
import IconCopy from './IconCopy';
import { useWalletContext } from '../contexts/wallet.context';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import IconCheckSmall from './IconCheckSmall';

export default function WalletNetworkWidget() {
  const { state, activeWallet, networksById, setScreen } = useWalletContext();
  const { text: copyText, onCopy } = useCopyToClipboard('', '+');

  if (!activeWallet) {
    return <></>;
  }

  return (
    <div className="flex bg-lightdark rounded-md h-10">
      {/* User wallet address */}
      <button
        title={activeWallet.address}
        className="oaw-button py-1 pl-3 pr-1.5 flex items-center min-w-0"
        onClick={() => onCopy(activeWallet.address)}
      >
        <span className="truncate text-lightgrey text-xs w-[70px]">{activeWallet.address}</span>

        <span className={clsx(['shrink-0 pl-0.5', { 'text-green': copyText === '+' }])}>
          {copyText === '+' ? <IconCheckSmall /> : <IconCopy />}
        </span>
      </button>

      {/* Network / chain */}
      <button
        title={
          !!state.networkId && !!networksById[state.networkId]
            ? networksById[state.networkId].name
            : 'No network'
        }
        className="oaw-button block py-1 px-1 min-w-0 relative"
        onClick={() => setScreen(state.walletScreen === 'networks' ? 'main' : 'networks')}
      >
        <IconEthereum />

        <span
          className={clsx(
            'w-2 h-2 rounded-full absolute right-2 bottom-1.5',
            state.isAccountWalletsStale ? 'bg-red' : 'bg-green'
          )}
        ></span>
      </button>
    </div>
  );
}
