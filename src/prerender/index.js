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
    const HTML = []
    const pages = await globImports("./src/pages/**/*{.js,.ts,.mdz}") 
    const StaticPags = await resolveStaticRoutes(pages, StaticRoutesMap)
    const Manifest = new ManifestParser(`${outDir}/.client/.vite/manifest.json`)
    // console.log({StaticPags})

    console.log({StaticPags})
    for(let route in StaticPags){
        const Page = StaticPags[route];
        const {Component} = Page
        // console.log({Page})
        if(Component){
          const res = await Component();
          const html = renderToString(res)
          // HTML.push({route, html})
          // writeToDist({route, html, entry_client_path : Manifest.EntryClientFile, outDir})
        }

    }
    // console.log({HTML})


    // return HTML;
}


export { prerender }