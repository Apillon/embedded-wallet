import { useWalletContext } from '../../contexts/wallet.context';
import IconCheckCircle from './Icon/IconCheckCircle';
import Toast from './Toast';

export default ({ text, className }: { text?: string; className?: string }) => {
  const { state, handleSuccess } = useWalletContext();

  if (!text && !state.displayedSuccess) {
    return <></>;
  }

  return (
    <Toast
      text={text || state.displayedSuccess}
      before={<IconCheckCircle className="shrink-0" />}
      className={className}
      onDismiss={() => handleSuccess('', 0)}
    />
  );
};
