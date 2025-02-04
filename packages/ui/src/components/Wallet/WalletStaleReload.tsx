import { useWalletContext } from '../../contexts/wallet.context';
import IconInfo from '../ui/Icon/IconInfo';
import IconRefresh from '../ui/Icon/IconRefresh';

export default function WalletStaleReload() {
  const {
    state: { loadingWallets },
    loadAccountWallets,
  } = useWalletContext();

  return (
    <div className="flex items-center gap-2 w-full">
      <IconInfo className="shrink-0 text-blue" />

      <span>Accounts are stale</span>

      <div className="grow"></div>

      <button
        className="oaw-button-plain !inline-flex items-center gap-0.5 !text-yellow"
        onClick={() => loadAccountWallets()}
      >
        <span className="text-xs">{loadingWallets ? '...' : 'Reload'}</span>
        <IconRefresh className="w-4 h-4" />
      </button>
    </div>
  );
}
