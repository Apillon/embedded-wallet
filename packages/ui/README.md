# Embedded Wallet UI

This package provides default UI for showing the state of connected account and confirmations on events.

Use `EmbeddedWalletUI()` to initialize SDK and the UI. The UI is done with React and HeadlessUI (tailwind).

There are some UI specific options in addition to all the SDK options.

```ts
/**
 * Automatically broadcast with SDK after confirming a transaction.
 *
 * Useful when signing transaction directly using SDK.
 */
broadcastAfterSign?: boolean;

/**
 * Remove styles from "open wallet" button
 */
disableDefaultActivatorStyle?: boolean;

/**
 * Placeholder displayed in input for username/email
 */
authFormPlaceholder?: string;
```

```js
import { EmbeddedWalletUI } from '@apillon/wallet-ui';

EmbeddedWalletUI('#open-wallet-button-selector', {
  clientId: 'YOUR INTEGRATION UUID HERE',
  broadcastAfterSign: false,
  disableDefaultActivatorStyle: false,
  networks: [
    {
      name: 'Moonbase Testnet',
      id: 1287,
      rpcUrl: 'https://rpc.testnet.moonbeam.network',
      explorerUrl: 'https://moonbase.moonscan.io',
    },
    {
      name: 'Amoy',
      id: 80002,
      rpcUrl: 'https://rpc-amoy.polygon.technology',
      explorerUrl: 'https://www.oklink.com/amoy',
    },
  ],
  // ...
});
```
