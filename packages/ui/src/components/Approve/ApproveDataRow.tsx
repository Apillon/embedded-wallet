import clsx from 'clsx';
import IconChevron from '../ui/Icon/IconChevron';
import { useState } from 'react';
import IconCopy from '../ui/Icon/IconCopy';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import IconCheckSmall from '../ui/Icon/IconCheckSmall';

export default ({
  label,
  data,
  collapsable = false,
  noLabelFormatting = false,
  copyable = false,
  className,
}: {
  label: string;
  data: string | React.ReactNode;
  collapsable?: boolean;
  noLabelFormatting?: boolean;
  copyable?: boolean;
  className?: string;
}) => {
  const { text: copyText, onCopy } = useCopyToClipboard('', '+');

  const [open, setOpen] = useState(false);

  const classes = clsx(
    '!flex items-center justify-between gap-6 w-full !min-h-[3rem]',
    '!rounded-md !px-4 !py-2 text-sm',
    '!bg-primarylight !text-offwhite'
  );

  // Split label into words and capitalize it
  if (!noLabelFormatting) {
    label = label
      .split(/(?=[A-Z])/)
      .join(' ')
      .toLowerCase()
      .replace(/^\w/, c => c.toUpperCase());
  }

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

  if (copyable && (typeof data === 'string' || typeof data === 'number')) {
    return (
      <a
        href="#"
        className={clsx('group relative block', classes, className)}
        onClick={ev => {
          ev.preventDefault();
          onCopy(data);
        }}
      >
        <div className="font-bold shrink-0">{label}</div>

        <div
          className="font-normal min-w-0 truncate"
          title={typeof data === 'string' || typeof data === 'number' ? `${data}` : ''}
        >
          {data}
        </div>

        <div
          className={clsx(
            'absolute top-0 right-0 h-full w-[40px]',
            'bg-primarylight rounded-md',
            'hidden group-hover:flex',
            'items-center justify-center'
          )}
        >
          {copyText === '+' ? (
            <IconCheckSmall className="text-green" />
          ) : (
            <IconCopy className="text-offwhite" />
          )}
        </div>
      </a>
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
