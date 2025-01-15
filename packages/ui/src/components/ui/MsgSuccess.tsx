import clsx from 'clsx';
import IconCheck from './Icon/IconCheck';

export default ({ text, className }: { text: string; className?: string }) => {
  return (
    <div
      className={clsx(
        'flex gap-2 items-center py-2 pl-3 pr-2 break-words text-sm text-deepdark bg-green rounded-md text-left',
        className
      )}
    >
      <IconCheck className="shrink-0" />
      <span>{text}</span>
    </div>
  );
};
