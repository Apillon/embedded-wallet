import { useApproveContext } from '../../contexts/approve.context';
import { TokensProvider } from '../../contexts/tokens.context';
import { useWalletContext } from '../../contexts/wallet.context';
import MsgError from '../ui/MsgError';
import Approve from '../Approve/Approve';
import ApproveSuccess from '../Approve/ApproveSuccess';
import WalletNetworkSelect from './WalletNetworkSelect';
import WalletTokens from './WalletTokens';
import WalletIndex from './WalletIndex';
import Topbar from '../Topbar/Topbar';
import SettingsMenuDot from '../Settings/SettingsMenuDot';
import AccountsDetails from '../Accounts/AccountsDetails';
import SettingsMenuMore from '../Settings/SettingsMenuMore';
import AccountsExport from '../Accounts/AccountsExport';
import AccountsImport from '../Accounts/AccountsImport';
import SettingsGeneral from '../Settings/SettingsGeneral';

/**
 * Base layout elements and screen display logic
 */
export default () => {
  const {
    state: { walletScreen, isAccountWalletsStale, loadingWallets },
    loadAccountWallets,
  } = useWalletContext();
  const { state: approveState } = useApproveContext();

  function content() {
    if (approveState.successInfo) {
      return <ApproveSuccess />;
    }

    if (
      !!approveState.targetChain ||
      !!approveState.txToConfirm ||
      !!approveState.messageToSign ||
      !!approveState.contractFunctionData
    ) {
      return <Approve />;
    }

    switch (walletScreen) {
      case 'networks':
        return <WalletNetworkSelect />;
      case 'menuDot':
        return <SettingsMenuDot />;
      case 'menuMore':
        return <SettingsMenuMore />;
      case 'settingsGeneral':
        return <SettingsGeneral />;
      case 'accountDetails':
        return <AccountsDetails />;
      case 'exportPrivateKey':
        return <AccountsExport />;
      case 'importAccount':
        return <AccountsImport />;
      case 'sendToken':
      case 'selectToken':
      case 'receiveToken':
        return (
          <TokensProvider>
            <WalletTokens />
          </TokensProvider>
        );
      /**
       * @TODO Other screens
       */
      default:
        return <WalletIndex />;
    }
  }

  return (
    <div className="h-[635px] flex flex-col">
      <Topbar />

      <div className="px-8 pb-4 grow overflow-y-auto">
        {!!isAccountWalletsStale && (
          <div className="flex gap-2 justify-between items-start py-2 px-3 break-words text-sm text-white bg-blue/75 rounded-md overflow-auto text-left mb-8">
            <span>Accounts are stale</span>
            <a href="#" className="font-bold" onClick={() => loadAccountWallets()}>
              {loadingWallets ? '...' : 'Reload'}
            </a>
          </div>
        )}

        {/* Error */}
        <MsgError show className="mb-6" />

        {content()}
      </div>

      {/* {state.walletScreen === 'exportPrivateKey' && <WalletPKExport />}
      {state.walletScreen === 'selectAccounts' && <WalletAccounts />}
      {state.walletScreen === 'addAccount' && <AccountsAdd />}
      {state.walletScreen === 'reloadAccounts' && <AccountsReload />}
      {state.walletScreen === 'importAccount' && <AccountsImport />}
      {state.walletScreen === 'renameAccount' && <AccountsRename />} */}
    </div>
  );
};
