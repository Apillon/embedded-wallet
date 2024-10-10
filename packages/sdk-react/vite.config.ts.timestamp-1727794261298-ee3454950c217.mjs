// vite.config.ts
import { defineConfig } from "file:///Users/simon/projects/oasis/embedded-wallet/node_modules/vite/dist/node/index.js";
import react from "file:///Users/simon/projects/oasis/embedded-wallet/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { nodePolyfills } from "file:///Users/simon/projects/oasis/embedded-wallet/node_modules/vite-plugin-node-polyfills/dist/index.js";
import { resolve } from "path";
import dts from "file:///Users/simon/projects/oasis/embedded-wallet/node_modules/vite-plugin-dts/dist/index.mjs";
import fs from "fs";
var __vite_injected_original_dirname = "/Users/simon/projects/oasis/embedded-wallet/packages/sdk-react";
function addStyles() {
  return {
    name: "add-styles",
    writeBundle(options, bundle) {
      if (bundle?.["react.js"]) {
        const data = fs.readFileSync("./dist/react.js", { encoding: "utf8" });
        fs.writeFileSync("./dist/react.js", `import './style.css';
` + data);
      }
    }
  };
}
var vite_config_default = defineConfig({
  plugins: [
    nodePolyfills(),
    react(),
    dts({
      include: ["lib"],
      tsconfigPath: resolve(__vite_injected_original_dirname, "tsconfig.app.json"),
      rollupTypes: true
    }),
    addStyles()
  ],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "lib/main.ts"),
      name: "EmbeddedWalletReact",
      fileName: "react"
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
    },
    target: "esnext"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc2ltb24vcHJvamVjdHMvb2FzaXMvZW1iZWRkZWQtd2FsbGV0L3BhY2thZ2VzL3Nkay1yZWFjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3NpbW9uL3Byb2plY3RzL29hc2lzL2VtYmVkZGVkLXdhbGxldC9wYWNrYWdlcy9zZGstcmVhY3Qvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3NpbW9uL3Byb2plY3RzL29hc2lzL2VtYmVkZGVkLXdhbGxldC9wYWNrYWdlcy9zZGstcmVhY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xuaW1wb3J0IHsgbm9kZVBvbHlmaWxscyB9IGZyb20gJ3ZpdGUtcGx1Z2luLW5vZGUtcG9seWZpbGxzJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5cbmZ1bmN0aW9uIGFkZFN0eWxlcygpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnYWRkLXN0eWxlcycsXG4gICAgd3JpdGVCdW5kbGUob3B0aW9uczogYW55LCBidW5kbGU6IHsgW2ZpbGVOYW1lOiBzdHJpbmddOiBhbnkgfSkge1xuICAgICAgaWYgKGJ1bmRsZT8uWydyZWFjdC5qcyddKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBmcy5yZWFkRmlsZVN5bmMoJy4vZGlzdC9yZWFjdC5qcycsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYygnLi9kaXN0L3JlYWN0LmpzJywgYGltcG9ydCAnLi9zdHlsZS5jc3MnO1xcbmAgKyBkYXRhKTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xufVxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIG5vZGVQb2x5ZmlsbHMoKSxcbiAgICByZWFjdCgpLFxuICAgIGR0cyh7XG4gICAgICBpbmNsdWRlOiBbJ2xpYiddLFxuICAgICAgdHNjb25maWdQYXRoOiByZXNvbHZlKF9fZGlybmFtZSwgJ3RzY29uZmlnLmFwcC5qc29uJyksXG4gICAgICByb2xsdXBUeXBlczogdHJ1ZSxcbiAgICB9KSxcbiAgICBhZGRTdHlsZXMoKSxcbiAgXSxcblxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnbGliL21haW4udHMnKSxcbiAgICAgIG5hbWU6ICdFbWJlZGRlZFdhbGxldFJlYWN0JyxcbiAgICAgIGZpbGVOYW1lOiAncmVhY3QnLFxuICAgIH0sXG5cbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1xuICAgICAgICAncmVhY3QnLFxuICAgICAgICAncmVhY3QtZG9tJyxcbiAgICAgICAgJ3JlYWN0L2pzeC1ydW50aW1lJyxcbiAgICAgICAgJ0BoZWFkbGVzc3VpL3JlYWN0JyxcbiAgICAgICAgJ0Bub2JsZS9jdXJ2ZXMnLFxuICAgICAgICAnQG9hc2lzcHJvdG9jb2wvc2FwcGhpcmUtcGFyYXRpbWUnLFxuICAgICAgICAnYWJpdHlwZScsXG4gICAgICAgICdhc24xanMnLFxuICAgICAgICAnY2Jvci1yZWR1eCcsXG4gICAgICAgICdlY2RzYS1zZWNwMjU2cjEnLFxuICAgICAgICAnZWxsaXB0aWMnLFxuICAgICAgICAnZXRoZXJzJyxcbiAgICAgICAgJ21pdHQnLFxuICAgICAgICAncGJrZGYyJyxcbiAgICAgICAgJ3JlYWN0LXFyLWNvZGUnLFxuICAgICAgICAnc2VjcDI1NnIxJyxcbiAgICAgICAgJ3ZpZW0nLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFcsU0FBUyxvQkFBb0I7QUFDelksT0FBTyxXQUFXO0FBQ2xCLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsZUFBZTtBQUN4QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxRQUFRO0FBTGYsSUFBTSxtQ0FBbUM7QUFPekMsU0FBUyxZQUFZO0FBQ25CLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFlBQVksU0FBYyxRQUFxQztBQUM3RCxVQUFJLFNBQVMsVUFBVSxHQUFHO0FBQ3hCLGNBQU0sT0FBTyxHQUFHLGFBQWEsbUJBQW1CLEVBQUUsVUFBVSxPQUFPLENBQUM7QUFDcEUsV0FBRyxjQUFjLG1CQUFtQjtBQUFBLElBQTRCLElBQUk7QUFBQSxNQUN0RTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFHQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxjQUFjO0FBQUEsSUFDZCxNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDRixTQUFTLENBQUMsS0FBSztBQUFBLE1BQ2YsY0FBYyxRQUFRLGtDQUFXLG1CQUFtQjtBQUFBLE1BQ3BELGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxJQUNELFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFFQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQ3ZDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFFQSxlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLEVBQ1Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
