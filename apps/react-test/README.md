# React + TypeScript + Vite

## Vite + Embedded Wallet

A Vite plugin is required for running and building Vite apps with Embedded Wallet.
This plugin enables Node API in the browser (eg. Buffer, Crypto).

```sh
npm i -D vite-plugin-node-polyfills
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [nodePolyfills() /* ... */],
});
```
