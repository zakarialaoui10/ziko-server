import { globImports } from "ziko-server/server-only-utils";
import { renderToString } from "ziko-server/server-only-utils";

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
        console.log({handler})
      }
    } else {
      result[routePattern] = handler;
    }
  }

  return result;
}


async function prerender() {

    const pages = await globImports("./src/pages/**/*{.js,.mdz}") 
    
    const st = await resolveStaticRoutes(pages, StaticRoutesMap)
    const App = st["/articles/id/1"] 
    const res = await App()
    const html = renderToString(res)

    // console.log(st)
}

export { prerender }