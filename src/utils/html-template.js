export const HTMLTemplate = `
<!doctype html>
<html lang="en">
  <head>
    <title>Z</title>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="test ziko-ssr"/>
    <title>Vite App</title>
    <!--app-head-->
  </head>
  <body>
    <!--app-html-->
    <script type="module" src="/src/entry-client.js" async></script>
    <!-- <script type="module" src="node_modules/ziko-server/entry/client.js" async></script> -->
  </body>
</html>
`