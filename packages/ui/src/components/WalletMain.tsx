import { useWalletContext } from '../contexts/wallet.context';
import Btn from './Btn';
import WalletNetworkSelect from './WalletNetworkSelect';
import WalletTransactions from './WalletTransactions';
import WalletTokens from './WalletTokens';
import { TokensProvider } from '../contexts/tokens.context';
import WalletError from './WalletError';
import WalletPKExport from './WalletPKExport';
import WalletAccounts from './WalletAccounts';
import AccountsAdd from './AccountsAdd';
import AccountsReload from './AccountsReload';

export default function WalletMain() {
  const { state, activeWallet, setScreen } = useWalletContext();

  return (
    <div>
      {/* Error */}
      <WalletError show className="mb-6" />

      {state.walletScreen === 'main' && (
        <div>
          {/* Account info: username, address, balance */}
          <div className="text-center mb-5">
            <h3 className="break-words mb-4">Welcome {activeWallet?.title || state.username}!</h3>

            <p className="font-bold">Your balance: {activeWallet?.balance || 0} ETH</p>
          </div>

          {/* Actions: send/receive */}
          <div className="flex gap-4 mb-12 justify-center">
            <Btn minWidth="0" onClick={() => setScreen('sendToken')}>
              Send
            </Btn>

            <Btn minWidth="0" onClick={() => setScreen('receiveToken')}>
              Receive
            </Btn>

            <Btn minWidth="0" disabled>
              Buy
            </Btn>
          </div>

          {/* Transactions */}
          <WalletTransactions />
        </div>
      )}

      {state.walletScreen === 'networks' && (
        <div>
          <WalletNetworkSelect />
        </div>
      )}

      {['sendToken', 'selectToken', 'receiveToken'].includes(state.walletScreen) && (
        <div>
          <TokensProvider>
            <WalletTokens />
          </TokensProvider>
        </div>
      )}

      {state.walletScreen === 'exportPrivateKey' && <WalletPKExport />}
      {state.walletScreen === 'selectAccounts' && <WalletAccounts />}
      {state.walletScreen === 'addAccount' && <AccountsAdd />}
      {state.walletScreen === 'reloadAccounts' && <AccountsReload />}
    </div>
  );
}
