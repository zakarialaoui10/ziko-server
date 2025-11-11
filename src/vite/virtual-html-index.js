export function virtualHtmlIndex() {
  return {
    name: 'virtual-html',
    enforce: 'pre',

    // Serve the virtual HTML during dev
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/' || req.url === '/index.html') {
          res.setHeader('Content-Type', 'text/html')
          res.end(`
<!doctype html>
<html lang="en">
  <head>
    <title>Ziko - SSR - Virtual</title>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="test ziko-ssr"/>
    <!-- <script type="module" src="/.ziko/entry-client.js"></script> -->
    <!--app-head-->
  </head>
  <body>
    <!-- TEST COMMENT -->
    <!--app-html-->
  </body>
</html>
          `)
          return
        }
        next()
      })
    },

    // Make Vite aware of this file for build
    resolveId(id) {
      if (id === 'virtual:index.html') return id
    },
    load(id) {
      if (id === 'virtual:index.html') {
        return `
<!doctype html>
<html lang="en">
  <head>
    <title>Ziko - SSR - Virtual</title>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="test ziko-ssr"/>
    <!-- <script type="module" src="/.ziko/entry-client.js"></script> -->
    <!--app-head-->
  </head>
  <body>
    <!-- TEST COMMENT -->
    <!--app-html-->
  </body>
</html>
        `
      }
    },
  }
}
