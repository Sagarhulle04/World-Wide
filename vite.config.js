import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy any request starting with /bdc to the BigDataCloud API
      // Usage in code: fetch('/bdc/data/reverse-geocode-client?latitude=...&longitude=...')
      "/bdc": {
        target: "https://api-bdc.io",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/bdc/, ""),
      },
    },
  },
});
