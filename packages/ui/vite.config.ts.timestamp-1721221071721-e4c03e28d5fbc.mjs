// vite.config.ts
import { defineConfig } from "file:///Users/simon/projects/oasis/oasis-app-wallet/node_modules/vite/dist/node/index.js";
import react from "file:///Users/simon/projects/oasis/oasis-app-wallet/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { nodePolyfills } from "file:///Users/simon/projects/oasis/oasis-app-wallet/node_modules/vite-plugin-node-polyfills/dist/index.js";
import { resolve } from "path";
import dts from "file:///Users/simon/projects/oasis/oasis-app-wallet/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/simon/projects/oasis/oasis-app-wallet/packages/ui";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    nodePolyfills(),
    dts({
      tsconfigPath: resolve(__vite_injected_original_dirname, "tsconfig.app.json"),
      include: ["src"],
      rollupTypes: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/main.tsx"),
      fileName: "ui",
      name: "EmbeddedWalletUi"
      // formats: ['es']
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@headlessui/react",
        "@noble/curves",
        "@oasisprotocol/sapphire-paratime",
        "abitype",
        "asn1js",
        "cbor-redux",
        "ecdsa-secp256r1",
        "elliptic",
        "ethers",
        "mitt",
        "pbkdf2",
        "react-qr-code",
        "secp256r1",
        "viem"
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc2ltb24vcHJvamVjdHMvb2FzaXMvb2FzaXMtYXBwLXdhbGxldC9wYWNrYWdlcy91aVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3NpbW9uL3Byb2plY3RzL29hc2lzL29hc2lzLWFwcC13YWxsZXQvcGFja2FnZXMvdWkvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3NpbW9uL3Byb2plY3RzL29hc2lzL29hc2lzLWFwcC13YWxsZXQvcGFja2FnZXMvdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xuaW1wb3J0IHsgbm9kZVBvbHlmaWxscyB9IGZyb20gJ3ZpdGUtcGx1Z2luLW5vZGUtcG9seWZpbGxzJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIG5vZGVQb2x5ZmlsbHMoKSxcbiAgICBkdHMoe1xuICAgICAgdHNjb25maWdQYXRoOiByZXNvbHZlKF9fZGlybmFtZSwgJ3RzY29uZmlnLmFwcC5qc29uJyksXG4gICAgICBpbmNsdWRlOiBbJ3NyYyddLFxuICAgICAgcm9sbHVwVHlwZXM6IHRydWUsXG4gICAgfSksXG4gIF0sXG5cbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9tYWluLnRzeCcpLFxuICAgICAgZmlsZU5hbWU6ICd1aScsXG4gICAgICBuYW1lOiAnRW1iZWRkZWRXYWxsZXRVaScsXG4gICAgICAvLyBmb3JtYXRzOiBbJ2VzJ11cbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXG4gICAgICAgICdyZWFjdCcsXG4gICAgICAgICdyZWFjdC1kb20nLFxuICAgICAgICAncmVhY3QvanN4LXJ1bnRpbWUnLFxuICAgICAgICAnQGhlYWRsZXNzdWkvcmVhY3QnLFxuICAgICAgICAnQG5vYmxlL2N1cnZlcycsXG4gICAgICAgICdAb2FzaXNwcm90b2NvbC9zYXBwaGlyZS1wYXJhdGltZScsXG4gICAgICAgICdhYml0eXBlJyxcbiAgICAgICAgJ2FzbjFqcycsXG4gICAgICAgICdjYm9yLXJlZHV4JyxcbiAgICAgICAgJ2VjZHNhLXNlY3AyNTZyMScsXG4gICAgICAgICdlbGxpcHRpYycsXG4gICAgICAgICdldGhlcnMnLFxuICAgICAgICAnbWl0dCcsXG4gICAgICAgICdwYmtkZjInLFxuICAgICAgICAncmVhY3QtcXItY29kZScsXG4gICAgICAgICdzZWNwMjU2cjEnLFxuICAgICAgICAndmllbScsXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFYsU0FBUyxvQkFBb0I7QUFDdlgsT0FBTyxXQUFXO0FBQ2xCLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsZUFBZTtBQUN4QixPQUFPLFNBQVM7QUFKaEIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sY0FBYztBQUFBLElBQ2QsSUFBSTtBQUFBLE1BQ0YsY0FBYyxRQUFRLGtDQUFXLG1CQUFtQjtBQUFBLE1BQ3BELFNBQVMsQ0FBQyxLQUFLO0FBQUEsTUFDZixhQUFhO0FBQUEsSUFDZixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBRUEsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUN4QyxVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUE7QUFBQSxJQUVSO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
