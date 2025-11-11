import { 
  globImports,
  renderToString,
  writeToDist,
  ManifestParser,
  resolveStaticRoutes
 } from "ziko-server/server-only-utils";

const StaticRoutesMap = {
    "/blog/[...slug]":[
        { slug : 1 },
        { slug : 2 },
        { slug : 3 }
    ],
    "/bb/[lang]/dd/[id]":[
        { lang : "en", id : 1},
        { lang : "en", id : 2},
        { lang : "en", id : 3},
        { lang : "fr", id : 1},
        { lang : "fr", id : 2},
        { lang : "fr", id : 3}
    ]
}



async function prerender({outDir = 'dist'} = "") {
    const PRERENDERED_ROUTES = []
    const pages = await globImports("./src/pages/**/*{.js,.ts,.mdz}") 
    const StaticPages = await resolveStaticRoutes(pages, StaticRoutesMap)
    const Manifest = new ManifestParser(`${outDir}/.client/.vite/manifest.json`)
    for(let route in StaticPages){
        const Component = StaticPages[route];
        if(Component){
          const res = await Component();
          const html = renderToString(res)
          PRERENDERED_ROUTES.push(route)
          writeToDist({route, html, entry_client_path : Manifest.EntryClientFile, outDir})
        }
        console.log(PRERENDERED_ROUTES)
    }
}


export { prerender }