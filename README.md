# Apillon Embedded Wallets

## Introduction

**Apillon's Embedded Wallet Service** redefines crypto asset management by blending the simplicity of Web2 onboarding with the security of hardware wallets and the convenience of hot wallets. It offers a secure, non-custodial, and fully decentralized solution for managing crypto assets seamlessly within applications.

## What is an Embedded Wallet?

An embedded wallet is an in-app wallet that provides a streamlined experience for generating and signing transactions with your private key, without requiring separate downloads or installations. By integrating directly into applications via an SDK, embedded wallets simplify onboarding, allowing users to log in with just their email and a verification code. This setup eliminates mnemonic phrases, making the experience accessible and secure.

To learn more about Apillon's embedded wallet service, read our [full wiki page](https://wiki.apillon.io/web3-services/9-embedded-wallets.html)

## SDK

- `@apillon/wallet-sdk` [about](/packages/sdk/README.md)
- `@apillon/wallet-ui` [about](/packages/ui/README.md)
- `@apillon/wallet-react` [about](/packages/sdk-react/README.md)
- `@apillon/wallet-vue` [about](/packages/sdk-vue/README.md)

## Implementation examples/tests

- `/apps/embedded-wallet-demo` - Example of controlling gas expenses on account manager contract by using signature callback when registering new wallets.
- `/apps/react-test`
- `/apps/vue-test`

## Testing

Testing is NOT automated as passkey validation is required.

Each of the pacakages has it's own manual tests. These can be run with running `npm run dev` in specific subdir.

Additionally, separate test apps are configured under `./apps`. These are more complete implementation examples.
