import {readFile} from 'node:fs/promises';
import express from 'express';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function createServer({ baseDir = process.cwd() } = {}) {
  const isProduction = process.env.NODE_ENV === "production";
  const port = process.env.PORT || 5173;
  const base = process.env.BASE || "/";

  const HTML_TEMPLATE = isProduction
    ? await readFile(join(baseDir, "./dist/index.html"), "utf-8") // To Fix
    : "";

  const app = express();

  let vite;
  if (!isProduction) {
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
      sirv(join(baseDir, "./dist/.client"), { extensions: [] }),
    );
  }

  // Serve HTML
  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, "");
      let template;
      let render;
      if (!isProduction) {
        template = await readFile(join(baseDir, "./index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/.entries/entry-server.js")).default;
      } 
      else {        
        // const file_path = join(process.cwd(), 'dist', url, 'index.html');
        // const file_exist = existsSync(file_path)
        // console.log({
        //     file_path,
        //     file_exist
        //   })

        // if(file_exist){
        //   const file = readFileSync(file_path, 'utf-8')
        //   // console.log({file})
        //   // res.status(200).set({ "Content-Type": "text/html" }).send(file)
        //   // res.sendFile(file_path);
        // }
        
        template = HTML_TEMPLATE;
        const entryServerPath = pathToFileURL(join(baseDir, "./dist/.server/entry-server.js")).href;
        render = (await import(/* @vite-ignore */entryServerPath)).default;
      }
      const rendered = await render(url);
      const page = await rendered(url);
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