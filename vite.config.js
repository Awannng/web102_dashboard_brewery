// vite.config.js
import { defineConfig } from "vite";

//solves the COR issue
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://api.openbrewerydb.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
