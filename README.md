# Embedded Wallet

Embedded wallet with **Oasis Sapphire** secured authentication.

## SDK

- `@embedded-wallet/sdk` [about](/packages/sdk/README.md)
- `@embedded-wallet/ui` [about](/packages/ui/README.md)
- `@embedded-wallet/react` [about](/packages/sdk-react/README.md)
- `@embedded-wallet/vue` [about](/packages/sdk-vue/README.md)

## Implementation examples/tests

- `/apps/apillon-demo` + `/apps/apillon-api` -- Example of controlling gas expenses on account manager contract by using signature callback when registering new wallets.
- `/apps/react-test`
- `/apps/vue-test`

## Testing

Testing is NOT automated as passkey validation is required.

Each of the pacakages has it's own manual tests. These can be run with running `npm run dev` in specific subdir.

Additionally, separate test apps are configured under `./apps`. These are more complete implementation examples.
