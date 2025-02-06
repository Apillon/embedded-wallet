import { useWalletContext } from '../../contexts/wallet.context';
import IconCircleX from './Icon/IconCircleX';
import Toast from './Toast';

export default ({
  text,
  show,
  className,
}: {
  text?: string;
  show?: boolean;
  className?: string;
}) => {
  const { state, handleError } = useWalletContext();

  if ((!state.displayedError && !text) || !show) {
    return <></>;
  }

  return (
    <Toast
      text={text || state.displayedError || ''}
      before={<IconCircleX className="shrink-0 text-pink" />}
      className={className}
      onDismiss={() => handleError()}
    />
  );
};
