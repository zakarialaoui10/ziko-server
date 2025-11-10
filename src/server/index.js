import {readFile} from "node:fs/promises";
// import { existsSync } from "node:fs";
import express from "express";
import path, {join} from "node:path";
import { pathToFileURL } from "node:url";
import { dev_server } from "./dev-server.js";
import { API_HANDLER } from "./api-handler.js";
import { importMiddlewares } from '../server-only-utils/import-middlwares.js'
import { importPrerenderedRoutes } from "../server-only-utils/import-prerendered-routes.js";


export async function createServer({ baseDir = process.cwd(), port = process.env.PORT || 5173 } = {}){
  const isProduction = process.env.NODE_ENV === "production";
  const base = process.env.BASE || "/";
  const HTML_TEMPLATE = isProduction ? await readFile(join(baseDir, "./dist/.client/index.html"), "utf-8") : "";
  const app = express();

  const Middlewares = await importMiddlewares()
  // console.log({Middlewares})

  app.use(Middlewares.logger)

  let vite;
  if (!isProduction) vite = await dev_server(app, base)
  else {
    const compression = (await import("compression")).default;
    const sirv = (await import("sirv")).default;
    app.use(compression());
    app.use(
      base,
      sirv(join(baseDir, "./dist/.client"), { extensions: [] }),
    );
  }

  // Serve HTML
  app.use('/.client', express.static(path.join(process.cwd(), 'dist/.client')))
  // app.use(express.static('public'))
  const PRERENDERED_ROUTES = await importPrerenderedRoutes()
  // console.log(PRERENDERED_ROUTES)
  for(let i=0; i<PRERENDERED_ROUTES.length; i++){
    app.get(PRERENDERED_ROUTES[i], (req, res)=>{
      res.sendFile(path.join(process.cwd(), `dist/${PRERENDERED_ROUTES[i]}/index.html`))
    })
  }
  // app.get('/', (req, res)=>{
  //   console.log(req.locals)
  //   res.sendFile(path.join(process.cwd(), 'dist/index.html'))
  // })
  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, "");
      let template;
      let render;
      if (!isProduction) {
        template = await readFile(join(baseDir, "./index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/.ziko/entry-server.js")).default;
      } 
      else {
        template = HTML_TEMPLATE;
        const ENTRY_SERVER_PATH = pathToFileURL(join(baseDir, "./dist/.server/entry-server.js")).href;
        render = (await import(/* @vite-ignore */ENTRY_SERVER_PATH)).default;
      }
      const rendered = await render(url, req);
      const page = await rendered(url, req);
      if(page.GET) return await API_HANDLER(page.GET, req, res)
      if(page.POST) return await API_HANDLER(page.POST, req, res)
      if(page.PUT) return await API_HANDLER(page.PUT, req, res)
      if(page.DELETE) return await API_HANDLER(page.DELETE, req, res)
      if(page.PATCH) return await API_HANDLER(page.PATCH, req, res)


        // console.log({ziko : page.__Ziko__})
        
      const html = template
        .replace(`<!--app-head-->`, page.head ?? "")
        .replace(`<!--app-html-->`, page.html ?? "");

      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } 
    catch (e) {
      vite?.ssrFixStacktrace(e);
      res.status(500).end(e.stack);
    }
  });

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });

  return app;
}


