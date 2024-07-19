# Embedded wallet UI

This package provides default UI for showing the state of connected account and confirmations on events.

Use `initializeApp()` to initialize SDK and the UI. The UI is done with React and HeadlessUI (tailwind).

There are some UI specific options in addition to all SDK options.

```ts
// Supported networks info, for showing names and links to explorer.
networks?: { name: string; id: number; rpcUrl: string; explorerUrl: string }[];

// If you want to broadcast the encoded data another way. E.g. via viem/ethers.
disableAutoBroadcastAfterSign?: boolean;

// Leave the "open wallet" button unstyled.
disableDefaultActivatorStyle?: boolean;

// Text for login/register input
authFormPlaceholder?: string;

// Set type=email for login/register input
isAuthEmail?: boolean;

// Send code to user
// If `onEmailConfirmRequest` is not provided the code check step is skipped
onEmailConfirmRequest?: (email: string) => Promise<any>;

// Confirm that entered code is correct
onEmailConfirm?: (email: string, code: string) => Promise<any>;
```

```js
import { initializeApp } from '@embedded-wallet/ui';

initializeApp('#open-wallet-button-selector', {
  disableAutoBroadcastAfterSign: false,
  disableDefaultActivatorStyle: false,
  accountManagerAddress: '0xF35C3eB93c6D3764A7D5efC6e9DEB614779437b1',
  networks: [
    {
      name: 'Moonbeam Testnet',
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
