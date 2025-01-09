import clsx from 'clsx';
import IconLinkOut from '../ui/IconLinkOut';
import IconLock from '../ui/IconLock';
import IconProfile from '../ui/IconProfile';
import IconChevron from '../ui/IconChevron';
import { useWalletContext, WalletScreens } from '../../contexts/wallet.context';
import Btn from '../ui/Btn';

export default () => {
  const {
    state: { networkId },
    networksById,
    activeWallet,
    dispatch,
    wallet,
    setScreen,
  } = useWalletContext();
  const network = networksById[networkId];

  const items = [
    {
      title: 'Account details',
      icon: <IconProfile />,
      screen: 'sendToken' as const,
    },
    {
      title: 'Settings & security',
      icon: <IconLock />,
      screen: 'networks' as const,
    },
    {
      title: 'View on Explorer',
      description: network.explorerUrl ? new URL(network.explorerUrl).hostname : undefined,
      icon: <IconLinkOut />,
      link:
        network.explorerUrl && activeWallet?.address
          ? `${network?.explorerUrl}/address/${activeWallet?.address}`
          : undefined,
      className: 'mt-3',
    },
  ];

  return (
    <div className="flex flex-col pt-10 gap-3 min-h-full">
      {items.map((item, index) => (
        <SettingsMenuItem key={index} {...item} />
      ))}

      <div className="grow" />

      <Btn
        variant="ghost"
        className="w-full"
        onClick={() => {
          dispatch({ type: 'reset' });

          wallet?.setAccount({
            username: '',
            walletIndex: 0,
            contractAddress: '',
            strategy: 'passkey',
            wallets: [],
          });

          setScreen('main');
        }}
      >
        Disconnect wallet
      </Btn>
    </div>
  );
};

const SettingsMenuItem = ({
  title,
  description,
  icon,
  link,
  screen,
  className,
}: {
  title: string;
  description?: string;
  icon: React.ReactNode;
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
