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
        networksSubstrate={[
          {
            name: 'Westend',
            id: 'westend',
            rpcUrl: 'wss://rpc.ibp.network/westend',
            explorerUrl: 'https://westend.subscan.io',
            currencySymbol: 'WND',
            currencyDecimals: 12,
            imageUrl:
              'https://raw.githubusercontent.com/TalismanSociety/chaindata/main/assets/chains/westend-testnet.svg',
          },
          {
            name: 'Westend Asset Hub',
            id: 'westend-asset-hub',
            rpcUrl: 'wss://westmint-rpc-tn.dwellir.com',
            explorerUrl: 'https://assethub-westend.subscan.io',
            currencySymbol: 'WND',
            currencyDecimals: 12,
            imageUrl:
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI3LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA2NDAgNjQwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2NDAgNjQwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzMyMUQ0Nzt9Cgkuc3Qxe2ZpbGw6I0ZGRkZGRjt9Cgkuc3Qye2ZpbGw6I0U2MDA3QTt9Cjwvc3R5bGU+CjxnPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYzNy4zLDMxOS4zYzAsMTc1LjItMTQyLDMxNy4zLTMxNy4zLDMxNy4zUzIuNyw0OTQuNiwyLjcsMzE5LjNTMTQ0LjgsMi4xLDMyMCwyLjFTNjM3LjMsMTQ0LjEsNjM3LjMsMzE5LjN6IgoJCS8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNDQ0LjIsMzkyLjRoLTY3LjZsLTEyLjctMzFoLTg1LjhsLTEyLjcsMzFoLTY3LjZsODAuOS0xODQuM2g4NC41TDQ0NC4yLDM5Mi40eiBNMzIxLjEsMjU2bC0yMi40LDU1aDQ0LjcKCQlMMzIxLjEsMjU2eiIvPgoJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iMzIxIiBjeT0iMTIyLjEiIHI9IjQ2LjkiLz4KCTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjMyMSIgY3k9IjUxNy4xIiByPSI0Ni45Ii8+Cgk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSIxNDcuOCIgY3k9IjIxNiIgcj0iNDYuOSIvPgoJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iNDk0LjMiIGN5PSIyMTYiIHI9IjQ2LjkiLz4KCTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjE0Ny44IiBjeT0iNDI0LjgiIHI9IjQ2LjkiLz4KCTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjQ5NC4zIiBjeT0iNDI0LjgiIHI9IjQ2LjkiLz4KPC9nPgo8L3N2Zz4K',
          },
        ]}
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

      {/* <TestSign />

      <br />
      <br />

      <h2>EIP-1193 requests test</h2>

      <TestEIP1193 />

      <br />
      <br />

      <h2>Transaction tests</h2>

      <TestTx />

      <h2>Test addToken event</h2>

      <TestTokenEvents /> */}
    </div>
  );
}
