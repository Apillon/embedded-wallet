# Embedded wallet Vue helpers

Collection of Vue composabes to help with embedded wallet implementation.

## Component `<WalletWidget />`

Initialize wallet SDK and UI.

```ts
import { WalletWidget } from '@embedded-wallet/vue';

<WalletWidget ...props />
```

## Hooks

### useWallet

Get the initialized instance of embedded wallet.

```ts
import { useWallet } from '@embedded-wallet/vue';

const { wallet } = useWallet();

console.log(await wallet.value.userExists('johndoe'));
```

### useAccount

Get current connected account info.

```ts
import { useAccount } from '@embedded-wallet/vue';

const { info, getBalance } = useAccount();
```

### useContract

Helper methods to interact with contracts.

```ts
import { useContract } from '@embedded-wallet/vue';

const { read, write } = useContract({
  abi: ERC20Abi,
  address: '0xb1058eD01451B947A836dA3609f88C91804D0663',
});

console.log(await read('balanceOf', [address]));

const txHash = await write(
  'transfer',
  ['0x700cebAA997ecAd7B0797f8f359C621604Cce6Bf', '10000000'],
  'React Transfer'
);
```
