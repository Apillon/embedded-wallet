import clsx from 'clsx';
import { WalletScreens, useWalletContext } from '../../contexts/wallet.context';
import IconChevron from '../ui/IconChevron';

export default ({
  title,
  description,
  icon,
  link,
  screen,
  className,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  link?: string;
  screen?: WalletScreens;
  className?: string;
}) => {
  const { setScreen } = useWalletContext();

  const content = (
    <>
      {icon}

      <div className="grow">
        <p className="text-sm font-normal text-offwhite">{title}</p>
        {description && <p className="text-xs text-lightgrey">{description}</p>}
      </div>

      <IconChevron />
    </>
  );

  const classes = clsx(
    'oaw-button-plain !px-4 !py-[0.6875rem] !rounded-md !flex items-center gap-4 !bg-primarylight !text-left',
    '!border !border-solid border-transparent !transition-colors',
    'hover:border-darkgrey',
    className
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  if (screen) {
    return (
      <button className={classes} onClick={() => setScreen(screen)}>
        {content}
      </button>
    );
  }

  return <></>;
};
