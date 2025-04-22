import {
  DefaultEthereumNetworks,
  DefaultSubstrateNetworks,
  getEmbeddedWallet,
} from '@apillon/wallet-sdk';
import EmbeddedWallet from '../src/components/EmbeddedWallet';
import TestEIP1193 from './TestEIP1193';
import TestSign from './TestSign';
import TestTx from './TestTx';
import TestTokenEvents from './TestTokenEvents';
import TestPolkadotInjected from './TestPolkadotInjected';

export default function TestApp() {
  return (
    <div>
      <h2>Wallet Widget</h2>

      <EmbeddedWallet
        clientId={import.meta.env.VITE_CLIENT_ID ?? 'YOUR INTEGRATION UUID HERE'}
        broadcastAfterSign
        passkeyAuthMode="popup"
        // disableDefaultActivatorStyle
        defaultNetworkId={'westend'}
        networks={DefaultEthereumNetworks}
        networksSubstrate={DefaultSubstrateNetworks}
        injectPolkadot
      />

      <div className="row">
        <button
          onClick={async () => {
            const w = getEmbeddedWallet();
            console.log(await w?.getGaspayingAddress());
          }}
        >
          Get gaspaying address
        </button>
      </div>

      <br />
      <br />

      <h2>Test sign</h2>

      <TestSign />

      <br />
      <br />

      <h2>EIP-1193 requests test</h2>

      <TestEIP1193 />

      <br />
      <br />

      <h2>Transaction tests</h2>

      <TestTx />

      <h2>Test addToken event</h2>

      <TestTokenEvents />

      <h2>Test polkadot injected extension</h2>

      <TestPolkadotInjected />
    </div>
  );
}
