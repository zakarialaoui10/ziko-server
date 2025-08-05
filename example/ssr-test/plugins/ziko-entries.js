// vite-plugin-ziko-entries/index.js
export default function VitePluginZikoEntries() {
  return {
    name: "vite-plugin-ziko-entries",

    resolveId(id) {
      if (
        ["ziko:entry-client", "ziko:entry-server", "ziko:server"].includes(id)
      ) {
        return "\0" + id;
      }
    },

    load(id) {
      switch (id) {
        case "\0ziko:entry-client":
          return `
// import { EntryClient } from "ziko-server/entry-client";
// export default EntryClient({});
          `.trim();

        case "\0ziko:entry-server":
          return `
import { EntryServer } from "ziko-server/entry-server";
export default EntryServer({});
          `.trim();

        case "\0ziko:server":
          return `
import { createServer } from "ziko-server/server";
createServer();
          `.trim();
      }
    },

    buildStart() {
      if (this.meta.watchMode) return; // skip in dev
      this.emitFile({
        type: "chunk",
        id: "ziko:entry-client",
        name: "entry-client",
      });

      // Uncomment to emit server entry in production too
      // this.emitFile({
      //   type: 'chunk',
      //   id: 'ziko:entry-server',
      //   name: 'entry-server',
      // });
    },

    transformIndexHtml(html, ctx) {
      if (ctx.bundle) {
        const clientChunk = Object.values(ctx.bundle).find(
          (chunk) => chunk.name === "entry-client" && chunk.type === "chunk"
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
      } else {
        // Dev mode
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
  };
}
