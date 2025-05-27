import IconLinkOut from '../ui/Icon/IconLinkOut';
import IconLock from '../ui/Icon/IconLock';
import IconProfile from '../ui/Icon/IconProfile';
import { useWalletContext } from '../../contexts/wallet.context';
import Btn from '../ui/Btn';
import SettingsMenuItem from './SettingsMenuItem';
import { sleep } from '../../lib/helpers';

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
      title: 'Account Details',
      icon: <IconProfile />,
      screen: 'accountDetails' as const,
    },
    {
      title: 'Account Settings',
      icon: <IconLock />,
      screen: 'menuMore' as const,
    },
    {
      title: 'View on Explorer',
      description: network?.explorerUrl ? new URL(network.explorerUrl).hostname : undefined,
      icon: <IconLinkOut />,
      link:
        network?.explorerUrl && activeWallet?.address
          ? `${network?.explorerUrl}/address/${activeWallet?.address}`
          : undefined,
      className: 'mt-3',
    },
  ];

  return (
    <div className="flex flex-col pt-10 pb-2 gap-3 min-h-full">
      {items.map((item, index) => (
        <SettingsMenuItem key={index} {...item} />
      ))}

      <div className="grow" />

      <Btn
        variant="ghost"
        className="w-full"
        onClick={async () => {
          dispatch({ type: 'reset' });

          await sleep(50);

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
