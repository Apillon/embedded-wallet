# Nuxt 3 Minimal Starter

## Nuxt + Embedded wallet

When using Vite as the build tool, a Vite plugin is required for running and building Nuxt apps with Embedded Wallet.
This plugin enables Node API in the browser (eg. Buffer, Crypto).

```sh
npm i -D vite-plugin-node-polyfills
```

```ts
// nuxt.config.ts
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineNuxtConfig({
  vite: {
    plugins: [nodePolyfills()],
  },

  /* ... */
});
```
