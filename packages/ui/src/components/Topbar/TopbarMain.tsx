import { useWalletContext } from '../../contexts/wallet.context';
import IconChevron from '../ui/IconChevron';
import apillonLogo from '../../assets/apillon.svg';
import IconVdots from '../ui/IconVdots';
import clsx from 'clsx';
import IconCheckSmall from '../ui/IconCheckSmall';
import IconCopy from '../ui/IconCopy';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';

export default () => {
  const {
    state: { username, networkId },
    networksById,
    activeWallet,
    setScreen,
  } = useWalletContext();

  const { text: copyText, onCopy } = useCopyToClipboard('', '+');

  const network = !!networkId && !!networksById[networkId] ? networksById[networkId] : null;

  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <div className="w-[72px] shrink-0">
        <button
          className="oaw-button-plain !rounded-md !bg-deepdark flex items-center gap-2.5 !py-1 !px-2"
          title={network?.name}
          onClick={() => setScreen('networks')}
        >
          <img
            src={
              network?.imageUrl ||
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='
            }
            alt={network?.name}
            className="w-5 h-5 rounded-full"
          />

          <span className="text-offwhite">
            <IconChevron />
          </span>
        </button>
      </div>

      <div className="flex-1 text-center min-w-0">
        <button
          className="oaw-button-plain flex items-center gap-1 mb-1.5 min-w-0 !text-offwhite max-w-full mx-auto"
          title={activeWallet?.title || username}
        >
          <span className="text-sm font-bold truncate">{activeWallet?.title || username}</span>

          <IconChevron />
        </button>

        {!!activeWallet && (
          <button
            title={activeWallet.address}
            className="oaw-button-plain !pl-2 !pr-0.5 flex items-center min-w-0 !text-lightgrey mx-auto"
            onClick={() => onCopy(activeWallet.address)}
          >
            <span className="truncate text-lightgrey text-xs w-[70px]">{activeWallet.address}</span>

            <span className={clsx(['shrink-0 pl-0.5', { 'text-green': copyText === '+' }])}>
              {copyText === '+' ? <IconCheckSmall /> : <IconCopy className="text-lightgrey" />}
            </span>
          </button>
        )}
      </div>

      <div className="w-[80px] flex items-center justify-end gap-2 -mr-2 shrink-0">
        <button
          className="oaw-button-plain !rounded-full !bg-deepdark relative w-8 h-8 shrink-0"
          title="Account"
        >
          <img src={apillonLogo} alt="Account" className="mx-auto" />

          <span className="w-2 h-2 rounded-full bg-green absolute bottom-0 right-0.5"></span>
        </button>

        <button
          className="oaw-button-plain !rounded-full !bg-transparent relative w-8 h-8 text-offwhite shrink-0"
          title="Settings"
          onClick={() => setScreen('menuDot')}
        >
          <IconVdots className="mx-auto" />
        </button>
      </div>
    </div>
  );
};
