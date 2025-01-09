import { useApproveContext } from '../../contexts/approve.context';
import { TokensProvider } from '../../contexts/tokens.context';
import { useWalletContext } from '../../contexts/wallet.context';
import Approve from '../Approve/Approve';
import ApproveSuccess from '../Approve/ApproveSuccess';
import Error from '../ui/Error';
import WalletNetworkSelect from './WalletNetworkSelect';
import WalletTokens from './WalletTokens';
import WalletIndex from './WalletIndex';
import Topbar from '../Topbar/Topbar';

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
    <div className="min-h-[635px]">
      <Topbar />

      <div className="px-8 pb-4">
        {!!isAccountWalletsStale && (
          <div className="flex gap-2 justify-between items-start py-2 px-3 break-words text-sm text-white bg-blue/75 rounded-md overflow-auto text-left mb-8">
            <span>Accounts are stale</span>
            <a href="#" className="font-bold" onClick={() => loadAccountWallets()}>
              {loadingWallets ? '...' : 'Reload'}
            </a>
          </div>
        )}

        {/* Error */}
        <Error show className="mb-6" />

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
