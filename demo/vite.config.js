import { defineConfig } from "vite";
import VitePluginRoutesMap from "./plugins/vite-plugin-routes-map.js";
import VitePluginZikoEntries from "./plugins/ziko-entries.js";

import { spawn } from 'child_process';

export default defineConfig({
  plugins: [
    // VitePluginRoutesMap(),
    // VitePluginZikoEntries(),
    // {
    //   name: 'run-virtual-node-process',
    //   configureServer() {
    //     const virtualCode = `
    //       // const { createServer } = require('ziko-server/server');
    //       // createServer();
    //     `;

    //     const proc = spawn('node', ['-e', virtualCode], {
    //       stdio: 'inherit',
    //       shell: true,
    //     });

    //     process.on('exit', () => proc.kill());
    //   }
    // }
    
  ],
  // build:{
  //   ssr : true,
  //   rollupOptions:{
  //     input : 'ziko:server'
  //   },
  //   outDir: 'dist-v/server'
  // }
});
