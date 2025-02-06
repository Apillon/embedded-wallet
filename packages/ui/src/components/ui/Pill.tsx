import clsx from 'clsx';

export default ({
  text,
  color = '#06080F',
  bg = '#78DCE8',
  className,
}: {
  text: string;
  color?: string;
  bg?: string;
  className?: string;
}) => (
  <span
    className={clsx(
      'font-sans text-[10px] font-bold text-center uppercase',
      {
        'px-2.5 py-1 min-h-6 rounded-full': !!bg,
      },
      className
    )}
    style={{ backgroundColor: bg, color }}
  >
    {text}
  </span>
);
