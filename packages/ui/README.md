# Embedded Wallet UI

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

// Skip email confirmation / code check.
isEmailConfirm?: boolean;

// Executes in auth process, after user enters a valid email. If an error is thrown, the auth process will terminate.
// Should be used to send a verification code to user.
// If this is not provided, Apillon service is used.
onEmailConfirmRequest?: (email: string) => Promise<any>;

// Executes in auth process, during email verification, confirm that entered code is correct.
// If `onEmailConfirmRequest` is not provided, Apillon service is used.
onEmailConfirm?: (email: string, code: string) => Promise<any>;
```

```js
import { initializeApp } from '@apillon/wallet-ui';

initializeApp('#open-wallet-button-selector', {
  disableAutoBroadcastAfterSign: false,
  disableDefaultActivatorStyle: false,
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
