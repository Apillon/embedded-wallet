import { useWalletContext } from '../../contexts/wallet.context';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import IconChevron from '../ui/Icon/IconChevron';
import IconCopy from '../ui/Icon/IconCopy';
import IconCheckSmall from '../ui/Icon/IconCheckSmall';
import clsx from 'clsx';
import { getSS58Address } from '../../lib/helpers';
import { useMemo } from 'react';
import { WalletType } from '@apillon/wallet-sdk';

export default ({ noChevron = false, className }: { noChevron?: boolean; className?: string }) => {
  const {
    state: { username, walletType },
    activeWallet,
    setScreen,
  } = useWalletContext();
  const { text: copyText, onCopy } = useCopyToClipboard('', '+');

  const address = useMemo(() => {
    if (walletType === WalletType.SUBSTRATE) {
      return getSS58Address(activeWallet?.address || '');
    }
    return activeWallet?.address || '';
  }, [activeWallet, walletType]);

  return (
    <div className={clsx('text-center', className)}>
      <button
        className="oaw-button-plain flex items-center gap-1 mb-1.5 min-w-0 !text-offwhite max-w-full mx-auto"
        title={activeWallet?.title || username}
        onClick={() => setScreen('selectAccounts')}
      >
        <span className="text-sm font-bold truncate">{activeWallet?.title || username}</span>

        {!noChevron && <IconChevron />}
      </button>

      {!!address && (
        <button
          title={address}
          className="oaw-button-plain !pl-2 !pr-0.5 flex items-center min-w-0 !text-lightgrey mx-auto"
          onClick={() => onCopy(address)}
        >
          <span className="truncate text-lightgrey text-xs w-[70px]">{address}</span>

          <span className={clsx(['shrink-0 pl-0.5', { 'text-green': copyText === '+' }])}>
            {copyText === '+' ? <IconCheckSmall /> : <IconCopy className="text-lightgrey" />}
          </span>
        </button>
      )}
    </div>
  );
};
