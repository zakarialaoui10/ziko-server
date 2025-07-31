import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [
    {
      name: 'ziko-entry-client',
      resolveId(id) {
        if (id === 'ziko:entry-client') return id;
      },
      load(id) {
        if (id === 'ziko:entry-client') {
          return `
          console.log(1)
          // import {EntryClient} from "ziko-server/entry-client";
          // EntryClient({
          //   pages : import.meta.glob("./pages/**/*{.js,.mdz}")
          // })
          `;
        }
      }
    }
  ]
});
