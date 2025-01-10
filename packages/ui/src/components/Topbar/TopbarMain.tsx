import { useWalletContext } from '../../contexts/wallet.context';
import IconChevron from '../ui/IconChevron';
import apillonLogo from '../../assets/apillon.svg';
import IconVdots from '../ui/IconVdots';
import AccountsCurrent from '../Accounts/AccountsCurrent';

export default () => {
  const {
    state: { networkId },
    networksById,
    setScreen,
  } = useWalletContext();

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

      <AccountsCurrent className="flex-1 min-w-0" />

      <div className="w-[80px] flex items-center justify-end gap-2 -mr-2 shrink-0">
        <button
          className="oaw-button-plain !rounded-full !bg-deepdark relative w-8 h-8 shrink-0"
          title="Account"
          onClick={() => setScreen('accountDetails')}
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
