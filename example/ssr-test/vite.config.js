import { defineConfig } from "vite";
import VitePluginRoutesMap from "./plugins/vite-plugin-routes-map.js";
import VitePluginZikoEntries from "./plugins/ziko-entries.js";

export default defineConfig({
  plugins: [
    VitePluginRoutesMap(),
    VitePluginZikoEntries()
    
  ],
  // build:{
  //   ssr : true,
  //   rollupOptions:{
  //     input : 'ziko:server'
  //   },
  //   outDir: 'dist-v/server'
  // }
});
