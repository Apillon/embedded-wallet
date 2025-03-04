import { useGlobalContext } from '../../contexts/global.context';
import Toast from './Toast';
import IconCircleX from './Icon/IconCircleX';

export default function MsgError({
  text,
  show,
  className,
}: {
  text?: string;
  show?: boolean;
  className?: string;
}) {
  const { error, handleError } = useGlobalContext();

  if ((!error && !text) || !show) {
    return <></>;
  }

  return (
    <Toast
      text={text || error || ''}
      before={<IconCircleX className="shrink-0 text-pink" />}
      className={className}
      onDismiss={() => handleError()}
    />
  );
}
