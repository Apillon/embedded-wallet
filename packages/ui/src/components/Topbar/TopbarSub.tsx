import { useWalletContext, WalletScreens } from '../../contexts/wallet.context';
import SettingsUsername from '../Settings/SettingsUsername';
import IconArrow from '../ui/Icon/IconArrow';
import IconHome from '../ui/Icon/IconHome';

const titles = {
  networks: 'Networks',
  transactions: 'Transactions',
  sendToken: 'Send',
  selectToken: 'Select token',
  importToken: 'Import tokens',
  accountDetails: 'Account details',
  menuMore: 'Settings & security',
  settingsGeneral: 'General settings',
  exportPrivateKey: 'Export private key',
  importAccount: 'Import private key',
  selectAccounts: 'Select account',
  addAccount: 'Add new account',
  nftDetail: 'NFT',
} as { [key in WalletScreens]: string };

export default () => {
  const {
    state: { walletScreen },
    goScreenBack,
    dispatch,
  } = useWalletContext();

  const title = titles[walletScreen];

  function centerContent() {
    if (walletScreen === 'menuDot') {
      return <SettingsUsername />;
    }

    return <span className="text-sm font-bold">{title}</span>;
  }

  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <div className="w-8 shrink-0">
        <button
          className="oaw-button-plain !rounded-full !bg-transparent w-8 h-8"
          title="Back"
          onClick={() => goScreenBack()}
        >
          <IconArrow className="inline-block" />
        </button>
      </div>

      <div className="flex-1 text-center min-w-0">{centerContent()}</div>

      <div className="w-8 shrink-0">
        <button
          className="oaw-button-plain !rounded-full !bg-transparent w-8 h-8"
          title="Home"
          onClick={() => {
            dispatch({
              type: 'setState',
              payload: { walletScreen: 'main', walletScreenHistory: ['main'] },
            });
          }}
        >
          <IconHome className="inline-block" />
        </button>
      </div>
    </div>
  );
};
