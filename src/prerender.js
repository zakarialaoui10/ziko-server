import { globImports } from "ziko-server/server-only-utils";
import { 
  renderToString,
  writeToDist,
  ManifestParser
 } from "ziko-server/server-only-utils";

const StaticRoutesMap = {
    "/articles/id/:id":[
        { id : 1},
        { id : 2},
        { id : 3}
    ],
    // "/blog/lang/:lang/id/:id":[
    //     { lang : "en", id : 1},
    //     { lang : "en", id : 2},
    //     { lang : "en", id : 3},
    //     { lang : "fr", id : 1},
    //     { lang : "fr", id : 2},
    //     { lang : "fr", id : 3}
    // ]
}
async function resolveStaticRoutes(routes, StaticRoutesMap) {
  const result = {};

  for (const [routePattern, handler] of Object.entries(routes)) {
    const staticParamsList = StaticRoutesMap[routePattern];

    if (staticParamsList && routePattern.includes(':')) {
      for (const params of staticParamsList) {
        const resolvedRoute = routePattern.replace(/:([^/]+)/g, (_, key) => {
          return encodeURIComponent(params[key]);
        });
        result[resolvedRoute] = () => handler(params);
        // console.log({handler})
      }
    } else {
      result[routePattern] = handler;
    }
  }

  return result;
}


async function prerender() {
    const HTML = []
    const pages = await globImports("./src/pages/**/*{.js,.mdz}") 
    const StaticPags = await resolveStaticRoutes(pages, StaticRoutesMap)
    const Manifest = new ManifestParser('./dist/.vite/manifest.json')

    for(let route in StaticPags){
        const App = StaticPags[route];
        const res = await App();
        const html = renderToString(res)
        HTML.push({route, html})
        writeToDist({route, html, entry_client_path : Manifest.EntryClientFile})
    }
    // console.log({HTML})


    // return HTML;
}


export { prerender }