import clsx from 'clsx';
import { useWalletContext } from '../../contexts/wallet.context';
import { formatBalance } from '../../lib/helpers';
import Btn from '../ui/Btn';
import WalletTransactions from './WalletTransactions';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

export default () => {
  const {
    state: { isAccountWalletsStale, loadingWallets, networkId },
    networksById,
    activeWallet,
    setScreen,
    loadAccountWallets,
  } = useWalletContext();

  const tabs = [
    {
      title: 'Transactions',
      content: <WalletTransactions />,
    },
    {
      title: 'Tokens',
      content: <ContentPlaceholder />,
      disabled: true,
    },
    {
      title: 'NFTs',
      content: <ContentPlaceholder />,
      disabled: true,
    },
  ];

  return (
    <div>
      {!!isAccountWalletsStale && (
        <div className="flex gap-2 justify-between items-start mt-6 -mb-6 py-2 px-3 break-words text-sm text-deepdark bg-blue rounded-md overflow-auto text-left">
          <span>Accounts are stale</span>

          <a href="#" className="font-bold text-deepdark" onClick={() => loadAccountWallets()}>
            {loadingWallets ? '...' : 'Reload'}
          </a>
        </div>
      )}

      <div className="py-12">
        {/* Account info: username, address, balance */}
        <div className="text-center mb-4">
          <p className="font-bold text-3xl">
            {formatBalance(
              activeWallet?.balance || '0',
              networksById?.[networkId]?.currencySymbol || 'ETH'
            )}
          </p>
        </div>

        {/* Actions: send/receive */}
        <div className="flex gap-4 justify-center">
          <Btn minWidth="0" minHeight="40px" onClick={() => setScreen('sendToken')}>
            Send
          </Btn>

          <Btn minWidth="0" minHeight="40px" onClick={() => setScreen('accountDetails')}>
            Receive
          </Btn>

          <Btn minWidth="0" minHeight="40px" disabled>
            Buy
          </Btn>
        </div>
      </div>

      <TabGroup>
        <div className="-mx-8 flex justify-center">
          <TabList className="flex rounded-full bg-brightdark mb-6">
            {tabs.map(t => (
              <Tab
                key={t.title}
                disabled={t.disabled}
                className={clsx(
                  'oaw-button-plain z-10',
                  '!rounded-full !py-2 !px-6 text-sm font-normal text-lightgrey',
                  '!border !border-solid !border-brightdark',
                  'data-[selected]:bg-deepdark data-[selected]:text-offwhite data-[selected]:z-20',
                  {
                    'hover:!text-lightgrey !cursor-not-allowed': t.disabled,
                  }
                )}
              >
                {t.title}
              </Tab>
            ))}
          </TabList>
        </div>

        <TabPanels>
          {tabs.map(t => (
            <TabPanel key={t.title}>{t.content}</TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

const ContentPlaceholder = () => (
  <div className="flex gap-4 justify-center">
    <div className="w-[125px] h-[144px] bg-primarybright rounded-lg"></div>
    <div className="w-[125px] h-[144px] bg-primarybright rounded-lg"></div>
  </div>
);
