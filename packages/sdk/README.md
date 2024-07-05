# Oasis App Wallet

JS SDK and wallet widget interface.

## Running locally and building

Check that "React dev" region is included in `./index.html`, then run `npm run dev`. This will start a development react app from `./src/tests/testMain.tsx`.

### Build

Build is done with [vite library mode](https://vitejs.dev/guide/build#library-mode).
Typescript support provided with [vite-plugin-dts](https://github.com/qmhc/vite-plugin-dts) (untested).
The build is divided into `sdk` and `ui` parts.

To test the build, run `npm run build`, then include "Package test" region in `./index.html` and run `npm run dev`.

## Using SDK from github private repo (TEMP)

### Option 1

Clone code to a private repo you have access to.

Get an access token for your github account: Settings > Developer Settings > Personal access tokens > Generate new token > classic token (https://github.com/settings/tokens)

Add path to package.json and run `npm i`.

```json
"dependencies": {
  "oasis-sdk": "git+https://simon:ghp_access_token@github.com/simon/oasis-wallet#main"
}
```

### Option 2

Build files, copy `/dist` dir into your project and import sdk locally.

(Can also copy into `node_modules` but it might get overwritten)

## SDK

SDK is centered around the `OasisAppWallet` class. This class exposes methods for working with Oasis Sapphire chain authentication.

Initialize the class once by using `initializeOnWindow()` utility, with optional configuration:

```ts
accountManagerAddress?: string;
sapphireUrl?: string;
defaultNetworkId?: number;
networkConfig?: NetworkConfig;
```

The class instance is then available on window (`oasisAppWallet`) and can be obtained with the `getOasisAppWallet()` utility.

### Events

The SDK exposes some events on its `events` property.

- `signatureRequest`
  e.g. display UI with message and approve/decline buttons

- `txApprove`
  e.g. display UI with transaction details and approve/decline buttons

- `txSubmitted`
  e.g. log the transaction in session storage or own backend

```ts
wallet.events.on('txSubmitted', tx => {
  console.log(tx);
});
```

### Auth methods

- `register`
  Create new "wallet" for username.
  Creates a new contract for each account on sapphire network.

- `authenticate`
  Check that credentials belong to some account.

### Transaction methods

- `signMessage`

- `signPlainTransaction`
  Authenticate with selected auth strategy through sapphire "Account Manager", then return signed tx data and chainId of tx.

- `broadcastTransaction`
  Send raw transaction data to network.
  If chainId is provided, the transaction is sent to that network (cross-chain).

- `signContractWrite`
  Get signed tx for making a contract write call.

- `contractRead`
  Get result of contract read.
  Utility function, this has nothing to do with Oasis.

## Use with ethers (v6)

SDK must be initialized first, then the `OasisEthersSigner` adapter can be used to work with ethers api.

```ts
const signer = new OasisEthersSigner(ethProvider);

// Sign message
const signed = await signer.signMessage('Please sign here');

// Use contract
const testContract = new ethers.Contract(
  '0xb1051231231231231231231231231231234D0663',
  contractAbi,
  signer
);
```

## Wallet UI

A default wallet UI can be added by using `initializeApp()`. This includes a react app that handles logged in state and transaction confirmations etc.

```ts
import { initializeApp } from './dist/ui';

initializeApp(undefined, '#oasis-btn', {
  accountManagerAddress: '0x5C3512312312312312312312312312312365D4bC',
  defaultNetworkId: 1287,
  networks: [
    {
      name: 'Moonbeam Testnet',
      id: 1287,
      rpcUrl: 'https://rpc.testnet.moonbeam.network',
      explorerUrl: 'https://moonbase.moonscan.io',
    },
    {
      name: 'Celo Alfajores Testnet',
      id: 44787,
      rpcUrl: 'https://alfajores-forno.celo-testnet.org',
      explorerUrl: 'https://explorer.celo.org/alfajores',
    },
  ],
});
```

## Stack

- React + TypeScript + Vite

- Ethers v6 used internally

## Types

- Contract types are theoretically provided with [ethers-abitype](https://github.com/RealPeha/ethers-abitype). However in some cases it expects the wrong type, so use `as any` without hesitation.

- package typescript support WIP
