import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
// import dts from 'vite-plugin-dts';
import { resolve } from 'path';
// import pkg from './package.json' assert { type: 'json' };

// "imports": {
//     "#types": "../../packages/sdk/lib/types.ts",
//     "#constants": "../../packages/sdk/lib/constants.ts",
//     "#ui": "../../packages/sdk/src/main.tsx"
//   },

// "baseUrl": ".",
//     "paths": {
//       "#sdk/*": ["../../packages/sdk/*"]
//     },

// https://vitejs.dev/config/
export default defineConfig({
  // resolve: {
  //   alias: {
  //     // '#sdk': resolve(__dirname, '../../packages/sdk'),
  //     // '#types': resolve(__dirname, '../../packages/sdk/lib/types.ts'),
  //     // '#constants': resolve(__dirname, '../../packages/sdk/lib/constants.ts'),
  //     // '#ui': resolve(__dirname, '../../packages/sdk/src/main.tsx'),
  //   },
  //   // alias: [
  //   //   {
  //   //     find: '@sdk',
  //   //     replacement: resolve(__dirname, '../../packages/sdk'),
  //   //   },
  //   // ],
  // },

  plugins: [
    nodePolyfills(),
    react(),
    // dts({
    //   rollupTypes: true,
    //   include: ['lib'],
    //   // bundledPackages: ['@oasis-app-wallet/sdk'],
    //   // bundledPackages: ['@oasis-app-wallet/*'],
    // }),
  ],

  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'OasisAppWalletReact',
      formats: ['es'],
    },

    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@sdk',
        // ...Object.keys(pkg.dependencies), //.filter(x => !x.startsWith('@oasis-app-wallet')), // don't bundle dependencies
        // /^node:.*/, // don't bundle built-in Node.js modules (use protocol imports!)
      ],
    },
    target: 'esnext',
  },
});
