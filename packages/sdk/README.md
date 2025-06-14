# Embedded App Wallet

Apillon Embedded Wallet JS SDK.

More info can be found [in the Apillon wiki](https://wiki.apillon.io/build/12-embedded-wallets-integration.html).

## Stack

- React + TypeScript + Vite

- Ethers v6 used internally

### Build

Build is done with [vite library mode](https://vitejs.dev/guide/build#library-mode).
Typescript support provided with [vite-plugin-dts](https://github.com/qmhc/vite-plugin-dts).

## SDK

SDK is centered around the `EmbeddedWallet` class. This class exposes methods for working with Oasis Sapphire chain authentication.

Initialize the class once by using `EmbeddedWalletSDK()` utility, with optional configuration:

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
networks?: Network[];

/**
 * Substrate networks. If no network is provided, substrate is disabled.
 *
 * You can use `SubstrateNetworks` const or your own network details.
 */
networksSubstrate?: Network[];

/**
 * Method for authenticating with passkey to make it global.
 */
passkeyAuthMode: 'redirect' | 'popup' | 'tab_form' = 'redirect';

/**
 * Register wallet as an injected web3 wallet, which can then be used via @polkadot/extension-dapp
 * @url https://polkadot.js.org/docs/extension/usage
 */
injectPolkadot?: boolean;
```

The class instance is then available on window (`embeddedWallet`) and can be obtained with the `getEmbeddedWallet()` utility.

### Events

The SDK exposes some events on its `events` property.

`events` has Typescript support and [`Events`](./lib/types.ts) type from SDK can be used to add types to handlers:

```js
import { Events } from '@apillon/wallet-sdk';

const onDataUpdated = (params: Events['dataUpdated']) => {
  // ...
};
```

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

- `requestChainChange`
  Emitted when tx chainId is different from defaultNetworkId. Must be resolve()'d to continue with the tx execution.

- `providerRequestAccounts`
  Triggered in 'eth_requestAccounts' provider request handler. Payload is resolver fn that should be invoked when user's account is available (after sign in / register)

- EIP-1193 events: `connect`, `disconnect`, `chainChanged`, `accountsChanged`

- `open`
  Emit to open or close Embedded wallet UI

- `addToken`
  Emit to programmatically add an ERC20 token

- `addTokenNft`
  Emit to programmatically add an NFT token

- `addTokenStatus`
  Emitted when `addToken` or `addTokenNft` resolves.

### Auth methods

- `register`
  Create new "wallet" for username.
  Creates a new contract for each account on sapphire network.

- `authenticate`
  Check that credentials belong to some account.

- `getAccountBalance`

- `getAccountPrivateKey`

### Wallet accounts methods

- `getAccountWallets`
  Get all wallets added on user's account. Requires authentication.

- `addAccountWallet`
  Add new wallet or import from privateKey.

- `getAddress`
  Get "currently active" account address.

- `getCurrentWallet`
  Get "currently active" account wallet.

### Transaction methods

- `signMessage`

- `submitTransaction`
  Prepare transaction and emit `txSubmitted` event (to show tx in tx history in UI e.g.).
  To be used after sending transaction through anything else than `broadcastTransaction`.
  Doesn't do anything by itself, just for logging/parsing transactions.

- `signContractWrite`
  Get signed tx for making a contract write call.

- `processGaslessMethod`
  Call a contract method with a gasless transaction (app owner pays for the transaction fees instead of user).

### EVM methods

EVM specific API is available in `window.embeddedWallet.evm`

- `getRpcProviderForNetworkId`

- `signPlainTransaction`
  Authenticate with selected auth strategy through sapphire "Account Manager", then return signed tx data and chainId of tx.

- `broadcastTransaction`
  Send raw transaction data to network.
  If chainId is provided, the transaction is sent to that network (cross-chain).

- `contractRead`
  Get result of contract read.
  Utility function, this has nothing to do with Oasis.

### Substrate (Polkadot) methods

Substrate specifc API is available in `window.embeddedWallet.ss`

- `getApiForNetworkId`
  Get polkadot.js API object for network (`defaultNetworkId` if none provided)

- `signTransaction`
  Sign a polkadot extrinsic. Either directly, e.g. `api.tx.balances.transferAllowDeath`, or a prepared `SignerPayloadJSON`.

- `broadcastTransaction`

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

## Use as polkadot.js injected wallet (WIP)

Must set `injectPolkadot` in configuration to `true`.
This will register the standard signer and options for injected wallets and allow you to use the `@polkadot/extension-dapp` interface.
[https://polkadot.js.org/docs/extension/usage](https://polkadot.js.org/docs/extension/usage)

```ts
/**
 * Sign a raw message
 */
async function signMessage() {
  await web3Enable('my cool dapp');

  const allAccounts = await web3Accounts();

  const account = allAccounts.find(a => a.meta.source === 'apillon-embedded-wallet');

  if (!account) {
    // no embedded wallet account
    return;
  }
  const injector = await web3FromSource(account.meta.source);

  const signRaw = injector?.signer?.signRaw;

  if (!!signRaw) {
    console.log(
      await signRaw({
        address: account.address,
        data: stringToHex('message to sign'),
        type: 'bytes',
      })
    );
  }
}
```

```ts
/**
 * Sign a polkadot.js transaction (extrinsic)
 */
async function signTransaction() {
  await web3Enable('my cool dapp');

  const w = getEmbeddedWallet();
  const api = await w?.ss.getApiForNetworkId();

  if (!api) {
    // no polkadot api
    return;
  }

  const allAccounts = await web3Accounts();

  const account = allAccounts.find(a => a.meta.source === 'apillon-embedded-wallet');

  if (!account) {
    // no embedded wallet account
    return;
  }

  const injector = await web3FromSource(account.meta.source);

  const transferExtrinsic = api.tx.balances.transferAllowDeath(
    '5H6Ym2FDEn8u5sfitLyKfGRMMZhmp2u855bxQBxDUn4ekhbK',
    0.01 * 1e12
  );

  transferExtrinsic
    .signAndSend(
      account.address,
      { signer: injector.signer, withSignedTransaction: true },
      ({ status }) => {
        if (status.isInBlock) {
          console.log(`Completed at block hash #${status.asInBlock.toString()}`);
        } else {
          console.log(`Current status: ${status.type}`);
        }
      }
    )
    .catch((error: any) => {
      console.log(':( transaction failed', error);
    });
}
```

## Wallet UI

A default wallet UI can be added by using `EmbeddedWalletUI()`. This includes a react app that handles logged in state and transaction confirmations etc.

```ts
import { DefaultEthereumNetworks, DefaultSubstrateNetworks } from '@apillon/wallet-sdk';
import { EmbeddedWalletUI } from '@apillon/wallet-ui';

EmbeddedWalletUI('#wallet', {
  clientId: 'YOUR INTEGRATION UUID HERE',
  defaultNetworkId: 1287,
  networks: DefaultEthereumNetworks,
  networksSubstrate: DefaultSubstrateNetworks,
});
```
