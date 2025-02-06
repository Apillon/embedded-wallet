import clsx from 'clsx';
import { useWalletContext } from '../../contexts/wallet.context';
import WalletStaleReload from '../Wallet/WalletStaleReload';
import IconInfo from './Icon/IconInfo';
import Toast from './Toast';

export default ({ text, className }: { text?: string; className?: string }) => {
  const { state, handleInfo } = useWalletContext();

  if (!text && !state.displayedInfo) {
    return <></>;
  }

  if (text === 'stale' || state.displayedInfo === 'stale') {
    return (
      <Toast
        className={clsx('!justify-start', className)}
        onDismiss={!state.displayedInfo ? undefined : () => handleInfo('', 0)}
      >
        <WalletStaleReload />
      </Toast>
    );
  }

  return (
    <Toast
      text={text || state.displayedInfo}
      before={<IconInfo className="shrink-0 text-blue" />}
      className={className}
      onDismiss={() => handleInfo('', 0)}
    />
  );
};
