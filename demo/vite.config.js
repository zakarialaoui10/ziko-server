import { defineConfig } from "vite";

export default defineConfig({
  plugins: [

  ],
  // build:{
  //   // ssr : true,
  //   ssrManifest : true,
  //   rollupOptions:{
  //     input : {
  //       app : 'index.html'
  //     }
  //   },
  //   outDir: 'dist-v'
  // }
});

// vite.config.js
// import { defineConfig } from "vite"

// export default defineConfig(({ command, mode }) => {
//   const isSSR = process.argv.includes("--ssr")
//   console.log({command, mode, isSSR})
//   // if (mode) {
//   //   // Server build
//   //   return {
//   //     build: {
//   //       ssr: "src/entry-server.js",
//   //       outDir: "dist/server",
//   //     },
//   //   }
//   // }

//   // Client build
//   return {
//     build: {
//       outDir: "dist/client",
//     },
//   }
// })
