import TestSign from './TestSign';
import './TestApp.css';
import TestEthers from './TestEthers';
import TestViem from './TestViem';
import TestAccount from './TestAccount';
import { getEmbeddedWallet } from '../../lib/utils';

export default function TestApp() {
  return (
    <div>
      <h2>Setup account</h2>
      <TestAccount />

      <h2>Sign message</h2>
      <TestSign />

      <h2>Get native balance (rpc test)</h2>
      <div className="row">
        <button
          onClick={async () => {
            const wallet = getEmbeddedWallet();
            console.log(
              await wallet?.getAccountBalance(wallet.lastAccount.address, wallet.defaultNetworkId)
            );
          }}
        >
          Get balance
        </button>
      </div>

      <h2>Trigger ethers test</h2>
      <div className="row">
        <TestEthers />
      </div>

      <h2>Trigger viem test</h2>
      <div className="row">
        <TestViem />
      </div>
    </div>
  );
}
