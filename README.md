# Embedded Wallet

Embedded wallet with **Oasis Sapphire** secured authentication.

## SDK

- `@apillon/wallet-sdk` [about](/packages/sdk/README.md)
- `@apillon/wallet-ui` [about](/packages/ui/README.md)
- `@apillon/wallet-react` [about](/packages/sdk-react/README.md)
- `@apillon/wallet-vue` [about](/packages/sdk-vue/README.md)

## Implementation examples/tests

- `/apps/embedded-wallet-demo` + `/apps/embedded-wallet-demo-api` -- Example of controlling gas expenses on account manager contract by using signature callback when registering new wallets.
- `/apps/react-test`
- `/apps/vue-test`

## Testing

Testing is NOT automated as passkey validation is required.

Each of the pacakages has it's own manual tests. These can be run with running `npm run dev` in specific subdir.

Additionally, separate test apps are configured under `./apps`. These are more complete implementation examples.
