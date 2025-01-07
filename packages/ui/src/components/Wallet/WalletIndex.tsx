import { useWalletContext } from '../../contexts/wallet.context';
import Btn from '../ui/Btn';
import WalletTransactions from './WalletTransactions';

export default () => {
  const { state, activeWallet, setScreen } = useWalletContext();

  return (
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
  );
};
