import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { resolve } from 'path';
import pkg from './package.json' with { type: 'json' };
import dts from 'vite-plugin-dts';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills(),
    dts({
      include: ['lib'],
      rollupTypes: true,
    }),
    mkcert(),
  ],

  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      fileName: 'sdk',
      name: 'EmbeddedWalletSdk',
      // formats: ['es']
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies),
        // ...Object.keys(pkg.dependencies).filter(x => x !== 'ethers6'), // don't bundle dependencies
        // ...Object.keys(pkg.dependencies).filter(
        //   x => !['ethers6', '@oasisprotocol/sapphire-paratime'].includes(x)
        // ), // don't bundle dependencies
        /^node:.*/, // don't bundle built-in Node.js modules (use protocol imports!)
      ],
    },
    target: 'esnext',
  },
});
