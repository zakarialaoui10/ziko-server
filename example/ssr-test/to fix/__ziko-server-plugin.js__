// vite-plugin-ziko.js
import {join} from 'path';
export default function zikoPlugin() {
  return {
    name: 'vite-plugin-ziko',

    config() {
      return {
        // Configuration for Vite, if needed
      };
    },

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const EntryClient = join(process.cwd(),"/src/entry-client.js")
        // console.log(req.url)
        if(req.url === EntryClient) console.log(1)
      
        if (req.url === './src/entry-client.js') {
          const content = `
            import {EntryClient} from "ziko-server/entry-client";
            EntryClient({
              pages : import.meta.glob("./pages/**/*{.js,.mdz}")
            })
              console.log(111)
          `;
          res.setHeader('Content-Type', 'application/javascript');
          res.end(content);
        } else if (req.url === '/entry-server.js') {
          const content = `
           import {defineServerEntry} from "ziko-server/entry-server";
           export default defineServerEntry({
              pages : import.meta.glob("./pages/**/*{.js,.mdz}")
           })
          `;
          res.setHeader('Content-Type', 'application/javascript');
          res.end(content);
        } else if (req.url === '/server.js') {
          const content = `
           import { createServer } from "ziko-server/server";
           createServer()
          `;
          res.setHeader('Content-Type', 'application/javascript');
          res.end(content);
        } else {
          next();
        }
      });
    },
  };
}