import clsx from 'clsx';
import IconChevron from '../ui/Icon/IconChevron';
import { useState } from 'react';

export default ({
  label,
  data,
  collapsable = false,
  className,
}: {
  label: string;
  data: string | React.ReactNode;
  collapsable?: boolean;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  const classes = clsx(
    '!flex items-center justify-between gap-6 w-full !min-h-[3rem]',
    '!rounded-md !px-4 !py-2 text-sm',
    '!bg-primarylight !text-offwhite'
  );

  // Split label into words and capitalize it
  label = label
    .split(/(?=[A-Z])/)
    .join(' ')
    .toLowerCase()
    .replace(/^\w/, c => c.toUpperCase());

  if (collapsable) {
    return (
      <div className={className}>
        <button
          className={clsx('oaw-button-plain', classes, { '!rounded-b-none': open })}
          onClick={() => setOpen(o => !o)}
        >
          <div className="font-bold shrink-0">{label}</div>
          <IconChevron className={open ? '-rotate-90' : 'rotate-90'} />
        </button>

        {open && (
          <div
            className={clsx(
              'px-4 py-2 rounded-b-md text-xs',
              'bg-primarybright text-lightgrey',
              'whitespace-pre-wrap break-all',
              'max-h-[220px] overflow-auto'
            )}
          >
            {data}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={clsx(classes, className)}>
      <div className="font-bold shrink-0">{label}</div>
      <div className="font-normal min-w-0 truncate" title={typeof data === 'string' ? data : ''}>
        {data}
      </div>
    </div>
  );
};
