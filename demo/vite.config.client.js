// vite.client.config.js
import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  build: {
    manifest: true, // <-- generate manifest.json
    rollupOptions: {
      input: path.resolve(__dirname, "src/entry-client.js"), // only client entry
    },
    outDir: "dist/client", // separate client output
    emptyOutDir: true,
  },
});
