import { useApproveContext } from '../../contexts/approve.context';
import { useWalletContext } from '../../contexts/wallet.context';
import MsgError from '../ui/MsgError';
import Approve from '../Approve/Approve';
import ApproveSuccess from '../Approve/ApproveSuccess';
import WalletNetworkSelect from './WalletNetworkSelect';
import WalletIndex from './WalletIndex';
import Topbar from '../Topbar/Topbar';
import SettingsMenuDot from '../Settings/SettingsMenuDot';
import AccountsDetails from '../Accounts/AccountsDetails';
import SettingsMenuMore from '../Settings/SettingsMenuMore';
import AccountsExport from '../Accounts/AccountsExport';
import AccountsImport from '../Accounts/AccountsImport';
import SettingsGeneral from '../Settings/SettingsGeneral';
import TokensSend from '../Tokens/TokensSend';
import AccountsList from '../Accounts/AccountsList';
import AccountsAdd from '../Accounts/AccountsAdd';
import MsgSuccess from '../ui/MsgSuccess';
import MsgInfo from '../ui/MsgInfo';
import TokensList from '../Tokens/TokensList';
import TokensImport from '../Tokens/TokensImport';
import TokensNftImport from '../Tokens/TokensNftImport';
import TokensNftDetail from '../Tokens/TokensNftDetail';
import clsx from 'clsx';
import TokensDetail from '../Tokens/TokensDetail';

/**
 * Base layout elements and screen display logic
 */
export default () => {
  const {
    state: { walletScreen },
    goScreenBack,
  } = useWalletContext();
  const { state: approveState } = useApproveContext();

  const isApprove =
    !!approveState.targetChain ||
    !!approveState.txToConfirm ||
    !!approveState.messageToSign ||
    !!approveState.contractFunctionData ||
    !!approveState.substrateTxData;

  function content() {
    if (approveState.successInfo) {
      return <ApproveSuccess />;
    }

    if (isApprove) {
      return <Approve />;
    }

    switch (walletScreen) {
      case 'approve':
        return <></>;
      case 'networks':
        return <WalletNetworkSelect />;

      /**
       * Menus
       */
      case 'menuDot':
        return <SettingsMenuDot />;
      case 'menuMore':
        return <SettingsMenuMore />;
      case 'settingsGeneral':
        return <SettingsGeneral />;

      /**
       * Account settings
       */
      case 'accountDetails':
        return <AccountsDetails />;
      case 'exportPrivateKey':
        return <AccountsExport />;
      case 'importAccount':
        return <AccountsImport />;
      case 'selectAccounts':
        return <AccountsList />;
      case 'addAccount':
        return <AccountsAdd />;

      /**
       * Tokens
       */
      case 'sendToken':
        return <TokensSend />;
      case 'importToken':
        return <TokensImport />;
      case 'selectToken':
        return (
          <TokensList
            asButtons
            highlightActiveToken
            showArrow
            className="pt-10 pb-2 min-h-full"
            onItemClick={() => goScreenBack()}
          />
        );
      case 'importNft':
        return <TokensNftImport />;
      case 'nftDetail':
        return <TokensNftDetail />;
      case 'tokenDetail':
        return <TokensDetail />;

      default:
        return <WalletIndex />;
    }
  }

  return (
    <div className="h-[635px] flex flex-col relative">
      <Topbar />

      <div className="px-8 pb-4 grow overflow-y-auto">{content()}</div>

      <div
        className={clsx('absolute z-10 -bottom-8 left-0 right-0 px-8 flex flex-col gap-2', {
          // Move notices up when action buttons are on screen, might need to add more conditions
          'bottom-20': isApprove,
        })}
      >
        <MsgSuccess />
        <MsgInfo />
        <MsgError show />
      </div>
    </div>
  );
};
