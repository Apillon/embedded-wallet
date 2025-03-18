import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import fs from 'fs';
import mkcert from 'vite-plugin-mkcert';

function addStyles() {
  return {
    name: 'add-styles',
    writeBundle(options: any, bundle: { [fileName: string]: any }) {
      if (bundle?.['vue.js']) {
        const data = fs.readFileSync('./dist/vue.js', { encoding: 'utf8' });
        fs.writeFileSync('./dist/vue.js', `import './vue.css';\n` + data);
      }
    },
  };
}

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
    addStyles(),
    mkcert(),
  ],

  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'EmbeddedWalletVue',
      fileName: 'vue',
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
        'ethers6',
        'mitt',
        'pbkdf2',
        'react-qr-code',
        'secp256r1',
        'viem',
      ],
    },
  },
});
