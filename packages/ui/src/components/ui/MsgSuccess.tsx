import clsx from 'clsx';
import { useWalletContext } from '../../contexts/wallet.context';
import IconCheck from './Icon/IconCheck';

export default ({ text, className }: { text?: string; className?: string }) => {
  const { state, setStateValue: setForWallet } = useWalletContext();

  if (!text && !state.displayedSuccess) {
    return <></>;
  }

  return (
    <div
      className={clsx(
        'flex gap-2 justify-between py-2 pl-3 pr-2 break-words text-sm text-deepdark bg-green rounded-md text-left',
        className
      )}
    >
      <div className="flex gap-2 min-w-0">
        <IconCheck className="shrink-0" />

        <div
          className="min-w-0 overflow-auto -ml-3 pl-3"
          style={{ maxHeight: '250px', direction: 'rtl' }}
        >
          <div className="break-words" style={{ direction: 'ltr' }}>
            {text || state.displayedSuccess || ''}
          </div>
        </div>
      </div>

      <button
        title="Dismiss"
        className="oaw-button-plain !text-white/50 hover:!text-white -mt-0.5 shrink-0"
        onClick={() => setForWallet('displayedSuccess', '')}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 10.6569L6.34317 5L4.92896 6.41421L10.5858 12.0711L4.92898 17.7279L6.3432 19.1421L12 13.4853L17.6569 19.1421L19.0711 17.7279L13.4143 12.0711L19.0711 6.41421L17.6569 5L12 10.6569Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
};
