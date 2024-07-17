import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills(),
    vue(),
    dts({
      include: ['lib'],
      tsconfigPath: resolve(__dirname, 'tsconfig.app.json'),
      rollupTypes: true,
    }),
    libInjectCss(),
  ],

  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'OasisAppWalletVue',
      fileName: 'vue',
      formats: ['es'],
    },

    rollupOptions: {
      external: [
        'vue',
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@headlessui/react',
        '@noble/curves',
        '@oasisprotocol/sapphire-paratime',
        'abitype',
        'asn1js',
        'cbor-redux',
        'ecdsa-secp256r1',
        'elliptic',
        'ethers',
        'mitt',
        'pbkdf2',
        'react-qr-code',
        'secp256r1',
        'viem',
      ],
    },
  },
});
