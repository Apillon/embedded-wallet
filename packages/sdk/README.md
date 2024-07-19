# Embedded App Wallet

JS SDK.

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
accountManagerAddress?: string;
sapphireUrl?: string;
defaultNetworkId?: number;
networkConfig?: NetworkConfig;
onGetSignature?: SignatureCallback;
```

The class instance is then available on window (`embeddedWallet`) and can be obtained with the `getEmbeddedWallet()` utility.

### onGetSignature

Provide this callback in configuration and it will be used to get contract values for registration. This is useful for controlling gas expenses on account manager contract when registering new wallets.

When `onGetSignature` is used, the provided contract should support `generateGaslessTx` contract function that accepts `timestamp` and `signature`.

```rust
function generateGaslessTx(bytes in_data, uint64 nonce, uint256 gasPrice, uint64 gasLimit, uint256 timestamp, bytes signature) view returns (bytes out_data)
```

The callback receives encoded `gaslessData` (string). An appropriate signature should then be generated for this data on e.g. some backend. The returned values should be:

```ts
{
  signature: string;
  gasLimit?: number;
  gasPrice?: number;
  timestamp: number
}
```

Example:

```ts
{
  onGetSignature: async gaslessData => {
    try {
      const res = await (
        await fetch(`https://api-dev.apillon.io/oasis/signature`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: `user session token`,
            data: gaslessData,
          }),
        })
      ).json();

      return {
        signature: res?.data.signature,
        gasLimit: res?.data.gasLimit || 0,
        gasPrice: res?.data.gasPrice || 0,
        timestamp: res?.data.timestamp,
      };
    } catch (e) {
      console.error('Signature request error', e);
    }

    return { signature: '', gasLimit: 0, timestamp: 0 };
  },
}
```

### Events

The SDK exposes some events on its `events` property.

- `signatureRequest`
  e.g. display UI with message and approve/decline buttons

- `txApprove`
  e.g. display UI with transaction details and approve/decline buttons

- `txSubmitted`
  e.g. log the transaction in session storage or own backend

- `txDone`
  Emitted by UI after a submitted tx is consisdered done (ethereum provider listener)

- `dataUpdated`
  Emitted after state data changes, e.g. for keeping track of active account

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

### mustConfirm

This parameter can be used for wallet actions that require user confirmation. If set to `true`, the event `signatureRequest`/`txApprove` will be emitted with `resolve()` method passed in payload. Once resolve is called, the action continues. This can be used to display tx confirmation UI e.g.

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
import { initializeApp } from '@embedded-wallet/ui';

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
