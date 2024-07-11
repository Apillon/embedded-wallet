import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { resolve } from 'path';
import pkg from './package.json' assert { type: 'json' };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [nodePolyfills(), react()],

  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'OasisAppWalletReact',
      formats: ['es'],
    },

    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies), //.filter(x => !x.startsWith('@oasis-app-wallet')), // don't bundle dependencies
        // /^node:.*/, // don't bundle built-in Node.js modules (use protocol imports!)
      ],
    },
    target: 'esnext',
  },
});
