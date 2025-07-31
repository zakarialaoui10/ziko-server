import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "ziko-entries",
      resolveId(id) {
        if (
          [
            "ziko:entry-client",
            "ziko:entry-server",
            "ziko:server",
          ].includes(id)
        ) return "\0" + id;
      },
      load(id) {
        switch (id) {
          case "\0ziko:entry-client":
            return `
import { EntryClient } from "ziko-server/entry-client";
export default EntryClient({});
console.log(1)`.trim();

          case "\0ziko:entry-server":
            return `
import { EntryServer } from "ziko-server/entry-server";
export default EntryServer({
  pages: import.meta.glob('/src/pages/**/*{.js,.mdz}')
}); `.trim();
         case "\0ziko:server":
            return `
import { createServer } from "ziko-server/server";
createServer()    
            `.trim()
        }
      },
      // Emit the virtual modules as chunks in build (production) only
      buildStart() {
        if (this.meta.watchMode) return; // skip in dev server mode
        this.emitFile({
          type: "chunk",
          id: "ziko:entry-client",
          name: "entry-client",
        });

        // this.emitFile({
        //   type: 'chunk',
        //   id: 'ziko:entry-server',
        //   name: 'entry-server',
        // });
      },
      transformIndexHtml(html, ctx) {
        // Prod
        if (ctx.bundle) {
          const clientChunk = Object.values(ctx.bundle).find(
            (chunk) => chunk.name === "entry-client" && chunk.type === "chunk",
          );
          if (clientChunk) {
            return {
              html,
              tags: [
                {
                  tag: "script",
                  attrs: { type: "module", src: `/${clientChunk.fileName}` },
                  injectTo: "head",
                },
              ],
            };
          }
        } 
        else {
          // dev mode: inject script with virtual module path using /@id/ prefix
          // return ; // To debug server
          return {
            html,
            tags: [
              {
                tag: "script",
                attrs: { type: "module", src: "/@id/ziko:entry-client" },
                injectTo: "head",
              },
            ],
          };
        }

        return html;
      },
    },
  ],
  // build:{
  //   ssr : true,
  //   rollupOptions:{
  //     input : 'ziko:server'
  //   },
  //   outDir: 'dist-v/server'
  // }
});
