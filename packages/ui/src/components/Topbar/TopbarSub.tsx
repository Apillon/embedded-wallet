import { useWalletContext, WalletScreens } from '../../contexts/wallet.context';
import IconArrow from '../ui/IconArrow';
import IconHome from '../ui/IconHome';

const titles = {
  networks: 'Networks',
  transactions: 'Transactions',
  sendToken: 'Send',
  selectToken: 'Select Token',
  receiveToken: 'Receive',
} as { [key in WalletScreens]: string };

export default () => {
  const {
    state: { walletScreen, walletScreenHistory },
    setScreen,
    dispatch,
  } = useWalletContext();

  const title = titles[walletScreen];

  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <div className="w-8 shrink-0">
        <button
          className="oaw-button-plain !rounded-full !bg-transparent w-8 h-8"
          title="Back"
          onClick={() => {
            if (walletScreenHistory.length > 1) {
              setScreen(walletScreenHistory[walletScreenHistory.length - 2]);
            } else {
              setScreen('main');
            }
          }}
        >
          <IconArrow className="inline-block" />
        </button>
      </div>

      <div className="flex-1 text-center min-w-0">
        <span className="text-sm font-bold">{title}</span>
      </div>

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
