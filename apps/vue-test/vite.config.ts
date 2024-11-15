import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [nodePolyfills(), vue(), mkcert()],

  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        /**
         * Ignore warnings for `Module level directives cause errors when bundled, "use client"`.
         * @src https://github.com/TanStack/query/issues/5175
         */
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      },
    },
  },
});
