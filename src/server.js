// server.js
import fs from 'node:fs/promises';
import express from 'express';

async function createServer({ isProduction, base, port }) {
  const app = express();

  // Cached production assets
  const templateHtml = isProduction
    ? await fs.readFile('./dist/client/index.html', 'utf-8')
    : '';

  /** @type {import('vite').ViteDevServer | undefined} */
  let vite;
  if (!isProduction) {
    const { createServer } = await import('vite');
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;
    app.use(compression());
    app.use(base, sirv('./dist/client', { extensions: [] }));
  }

  app.use('*all', async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, '');

      let template;
      let render;
      if (!isProduction) {
        template = await fs.readFile('./index.html', 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/entry-server.js')).render;
      } else {
        template = templateHtml;
        render = (await import('./dist/server/entry-server.js')).render;
      }

      const rendered = await render(url);
      const html = template
        .replace(`<!--app-head-->`, rendered.head ?? '')
        .replace(`<!--app-html-->`, rendered.html ?? '');

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e) {
      vite?.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

