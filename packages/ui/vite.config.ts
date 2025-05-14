import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills(),
    react(),
    dts({
      tsconfigPath: resolve(__dirname, 'tsconfig.app.json'),
      include: ['src'],
      rollupTypes: true,
    }),
    libInjectCss(),
    mkcert(),
  ],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.tsx'),
      fileName: 'ui',
      name: 'EmbeddedWalletUi',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        // 'react-qr-code',
        // '@headlessui/react',
        '@noble/curves',
        // '@oasisprotocol/sapphire-paratime',
        'abitype',
        // 'asn1js',
        // 'cbor-redux',
        'ecdsa-secp256r1',
        'elliptic',
        'ethers6',
        // 'mitt',
        // 'pbkdf2',
        // 'react-qr-code',
        // 'secp256r1',
        'viem',
        '@polkadot/api',
      ],
    },
  },
});
