import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { resolve } from 'path';
// import pkg from './package.json' assert { type: 'json' };

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
        'react',
        'react-dom',
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
    target: 'esnext',
  },
});
