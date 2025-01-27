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
import TokensSelect from '../Tokens/TokensSelect';
import TokensAdd from '../Tokens/TokensAdd';
import AccountsList from '../Accounts/AccountsList';
import AccountsAdd from '../Accounts/AccountsAdd';
import MsgSuccess from '../ui/MsgSuccess';

/**
 * Base layout elements and screen display logic
 */
export default () => {
  const {
    state: { walletScreen },
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
      case 'approve':
        return <></>;
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
      case 'selectToken':
      case 'sendToken':
      case 'addToken':
        return (
          <>
            {(() => {
              switch (walletScreen) {
                case 'sendToken':
                  return <TokensSend />;
                case 'addToken':
                  return <TokensAdd />;
                case 'selectToken':
                default:
                  return <TokensSelect />;
              }
            })()}
          </>
        );
      case 'selectAccounts':
        return <AccountsList />;
      case 'addAccount':
        return <AccountsAdd />;
      default:
        return <WalletIndex />;
    }
  }

  return (
    <div className="h-[635px] flex flex-col relative">
      <Topbar />

      <div className="px-8 pb-4 grow overflow-y-auto">{content()}</div>

      <div className="absolute -bottom-5 left-0 right-0 px-8 flex flex-col gap-2">
        <MsgSuccess />
        <MsgError show />
      </div>
    </div>
  );
};
