import { initializeOnWindow } from '../lib/utils';
import Test from './components/Test';
import WalletWidget from './components/WalletWidget';

initializeOnWindow({ rpcUrls: { 1287: 'https://rpc.testnet.moonbeam.network' } });

export default function App() {
  return (
    <div>
      <WalletWidget />
      <hr className="my-12" />
      <Test />
    </div>
  );
}
