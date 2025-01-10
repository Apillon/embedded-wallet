import clsx from 'clsx';

export default ({
  text,
  bg = '#78DCE8',
  className,
}: {
  text: string;
  bg?: string;
  className?: string;
}) => (
  <span
    className={clsx(
      'font-ibm text-[10px] font-bold text-center uppercase text-deepdark',
      'px-2.5 py-1 min-h-6 rounded-full',
      className
    )}
    style={{ backgroundColor: bg }}
  >
    {text}
  </span>
);
