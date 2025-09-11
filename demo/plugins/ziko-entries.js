// vite-plugin-ziko-entries/index.js
export default function VitePluginZikoEntries() {
  let clientChunkFile = null;

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
import { EntryClient } from "ziko-server/entry-client";
export default EntryClient({});
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

      // Optional: also emit the server entry
      // this.emitFile({
      //   type: "chunk",
      //   id: "ziko:entry-server",
      //   name: "entry-server",
      // });
    },

    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        if (!ctx.bundle) {
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
    },

    generateBundle(_, bundle) {
      // Locate the built client chunk
      const clientChunk = Object.values(bundle).find(
        (chunk) => chunk.name === "entry-client" && chunk.type === "chunk"
      );

      if (!clientChunk) return;

      clientChunkFile = "/" + clientChunk.fileName;

      // Inject the script into all HTML assets
      for (const [fileName, asset] of Object.entries(bundle)) {
        if (fileName.endsWith(".html") && asset.type === "asset") {
          asset.source = asset.source.replace(
            "</head>",
            `<script type="module" src="${clientChunkFile}"></script></head>`
          );
        }
      }
    },
  };
}
