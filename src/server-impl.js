import express from "express";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { prerender } from "./prerender.js";
prerender()

export async function createServer({ baseDir = process.cwd() } = {}) {
  const isProduction = process.env.NODE_ENV === "production";
  const port = process.env.PORT || 5173;
  const base = process.env.BASE || "/";

  const HTML_TEMPLATE = `
  <!doctype html>
  <html>
  <head>
  <title> Ziko - SSR - Template </title>
    <!--app-head-->
  </head>
  <body>
    <!--app-html-->
  </body>
  </html>
  `
  const app = express();
  let vite;
  if(!isProduction){
    const { createServer } = await import("vite");
    vite = await createServer({
      server: { middlewareMode: true },
      appType: "custom",
      base,
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import("compression")).default;
    const sirv = (await import("sirv")).default;
    app.use(compression());
    app.use(
      base,
      sirv(path.join(baseDir, "./dist/client"), { extensions: [] }),
    );
  }

app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, "");
      let template;
      let render;
      if (!isProduction) {
        template = HTML_TEMPLATE
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.js")).default;
      } else {
        template = HTML_TEMPLATE;
        // Convert path to a file:// URL for ESM import
        const entryServerPath = pathToFileURL(path.join(baseDir, "./dist/server/entry-server.js")).href;
        render = (await import(entryServerPath)).default;
      }
      const rendered = await render(url);
      const page = await rendered(url);
      const html = template
        .replace(`<!--app-head-->`, page.head ?? "")
        .replace(`<!--app-html-->`, page.html ?? "");

      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (e) {
      vite?.ssrFixStacktrace(e);
      res.status(500).end(e.stack);
    }
  });

  // Start http server
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });

  return app;
}
