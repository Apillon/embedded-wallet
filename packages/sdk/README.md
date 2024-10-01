# Embedded App Wallet

Apillon Embedded Wallet JS SDK

## Stack

- React + TypeScript + Vite

- Ethers v6 used internally

### Build

Build is done with [vite library mode](https://vitejs.dev/guide/build#library-mode).
Typescript support provided with [vite-plugin-dts](https://github.com/qmhc/vite-plugin-dts).

## SDK

SDK is centered around the `EmbeddedWallet` class. This class exposes methods for working with Oasis Sapphire chain authentication.

Initialize the class once by using `initializeOnWindow()` utility, with optional configuration:

```ts
/**
 * The Apillon integration UUID, obtained from the Apillon Developer Console
 */
clientId: string;

/**
 * Network ID for network (chain) selected on first use
 */
defaultNetworkId?: number;

/**
 * Configuration of available networks. Oasis Sapphire is always included (ids 23294 and 23295)
*/
networkConfig?: NetworkConfig;
```

The class instance is then available on window (`embeddedWallet`) and can be obtained with the `getEmbeddedWallet()` utility.

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

- `txDone`
  Emitted by UI after a submitted tx is consisdered done (ethereum provider listener)

- `dataUpdated`
  Emitted after state data changes, e.g. for keeping track of active account

- `providerRequestAccounts`
  Triggered in 'eth_requestAccounts' provider request handler. Payload is resolver fn that should be invoked when user's account is available (after sign in / register)

- EIP-1193 events: `connect`, `disconnect`, `chainChanged`, `accountsChanged`

### Auth methods

- `register`
  Create new "wallet" for username.
  Creates a new contract for each account on sapphire network.

- `authenticate`
  Check that credentials belong to some account.

- `getAccountAddress`
  Return EVM addresses (account and account contract) for username

- `getAccountBalance`

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

### mustConfirm

This parameter can be used for wallet actions that require user confirmation. If set to `true`, the event `signatureRequest`/`txApprove` will be emitted with `resolve()` method passed in payload. Once resolve is called, the action continues. This can be used to display tx confirmation UI e.g.

## Use as EIP-1193

Initialize SDK, then get the provider using `getProvider()`.

```ts
import { getProvider as getEmbeddedProvider } from '@apillon/wallet-sdk';
```

This can then be used as an injected ethereum provider, e.g. with **ethers**:

```ts
new ethers.providers.Web3Provider(getEmbeddedProvider(), 'any');
```

or **wagmi**:

```ts
const wagmiConfig = {
  ...,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        getProvider() {
          return getEmbeddedProvider() as any;
        },
      },
    }),
  ],
}
```

## Use with ethers (v6)

SDK must be initialized first, then the `EmbeddedEthersSigner` adapter can be used to work with ethers api.

```ts
import { EmbeddedEthersSigner } from '@apillon/wallet-sdk';
import { ethers } from 'ethers';

const signer = new EmbeddedEthersSigner(ethProvider);

// Sign message
const signed = await signer.signMessage('Please sign here');

// Use contract
const testContract = new ethers.Contract(
  '0xb1051231231231231231231231231231234D0663',
  contractAbi,
  signer
);
```

## Use with viem

SDK must be initialized first, then the `EmbeddedViemAdapter` can be used to work with viem.

```ts
import { EmbeddedViemAdapter } from '@apillon/wallet-sdk';
import { createPublicClient, createWalletClient, getContract, http } from 'viem';
import { moonbaseAlpha } from 'viem/chains';

const adapter = new EmbeddedViemAdapter();
const acc = adapter.getAccount();

// Sign
const signed = await acc.signMessage({ message: 'Please sign here via viem' });

// Use contract
const testContract = getContract({
  address: '0xb1058eD01451B947A836dA3609f88C91804D0663',
  abi: contractAbi,
  client: {
    public: createPublicClient({
      chain: moonbaseAlpha,
      transport: http(),
    }),
    wallet: createWalletClient({
      chain: moonbaseAlpha,
      transport: http('https://rpc.testnet.moonbeam.network'),
      account: acc,
    }),
  },
});
```

## Wallet UI

A default wallet UI can be added by using `initializeApp()`. This includes a react app that handles logged in state and transaction confirmations etc.

```ts
import { initializeApp } from '@apillon/wallet-ui';

initializeApp('#wallet', {
  clientId: '',
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
