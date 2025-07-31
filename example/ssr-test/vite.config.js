import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    {
      name: 'ziko-entries',

      // Resolve the virtual module IDs with \0 prefix
      resolveId(id) {
        if (['ziko:entry-client', 'ziko:entry-server'].includes(id)) {
          return '\0' + id;
        }
      },

      // Load the virtual module code for the resolved IDs
      load(id) {
        switch (id) {
          case '\0ziko:entry-client':
            return `
              import { EntryClient } from "ziko-server/entry-client";
              export default EntryClient({});
              console.log(1)
            `;

          case '\0ziko:entry-server':
            return `
              import { EntryServer } from "ziko-server/entry-server";
              export default EntryServer({
                pages: import.meta.glob('/src/pages/**/*{.js,.mdz}')
              });
              
            `;
        }
      },

      // Emit the virtual modules as chunks in build (production) only
      buildStart() {
        if (this.meta.watchMode) return; // skip in dev server mode

        this.emitFile({
          type: 'chunk',
          id: 'ziko:entry-client',
          name: 'entry-client',
        });

        // this.emitFile({
        //   type: 'chunk',
        //   id: 'ziko:entry-server',
        //   name: 'entry-server',
        // });
      },

      // Inject the client entry script tag in the built index.html
      transformIndexHtml(html, ctx) {
        if (ctx.bundle) {
          const clientChunk = Object.values(ctx.bundle).find(
            (chunk) => chunk.name === 'entry-client' && chunk.type === 'chunk'
          );
          if (clientChunk) {
            return {
              html,
              tags: [
                {
                  tag: 'script',
                  attrs: { type: 'module', src: `/${clientChunk.fileName}` },
                  injectTo: 'body',
                },
              ],
            };
          }
        }
        return html;
      },
    },
  ],
});
