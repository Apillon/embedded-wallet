import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { resolve } from 'path';
import pkg from './package.json' assert { type: 'json' };
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(),
    dts({
      include: ['lib', 'src'],
      rollupTypes: true,
      beforeWriteFile(filePath, content) {
        if (filePath.endsWith('ui.d.ts')) {
          return {
            filePath,
            content: `import { OasisAppWallet } from "./sdk";\n\n` + content,
          };
        }
      },
    }),
  ],

  build: {
    lib: {
      entry: {
        sdk: resolve(__dirname, 'lib/main.ts'),
        ui: resolve(__dirname, 'src/main.tsx'),
      },
      name: 'OasisAppWallet',
      // formats: ['es']
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies), // don't bundle dependencies
        /^node:.*/, // don't bundle built-in Node.js modules (use protocol imports!)
      ],
    },
    target: 'esnext',
  },
});
