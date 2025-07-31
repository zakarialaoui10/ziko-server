import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [
    {
      name: 'ziko-entry-client',
      resolveId(id) {
        if (['ziko:entry-client, ziko:entry-server'].includes(id)) return id;
      },
      load(id) {
        switch(id){
          case 'ziko:entry-client' : return `
            import {EntryClient} from "ziko-server/entry-client";
            EntryClient({})
          `
          case 'ziko:entry-server' : return `
            import {EntryClient} from "ziko-server/entry-server";
            EntryClient({})
          ` 
        }
      }
    }
  ]
});
