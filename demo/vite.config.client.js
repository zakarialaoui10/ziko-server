import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  build: {
    manifest: true, 
    rollupOptions: {
      input: path.resolve(__dirname, "src/entry-client.js"),
      output: {
        // Change the folder names for chunks & assets
        entryFileNames: `.client/[name].[hash].js`,
        chunkFileNames: `.client/[name].[hash].js`,
        assetFileNames: `.client/[name].[hash].[ext]`,
      },
    },
    outDir: "dist", 
    emptyOutDir: true,
  },
});
