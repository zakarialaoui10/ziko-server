import { 
  renderToString,
  globImports, 
} from "../server-only-utils/index.js";

import { 
  routesMatcher,
  dynamicRoutesParser,
  isDynamic
} from "../utils/routes-matcher.js";

export function EntryServer() {
  return async function render(path, req, res) {
    if(path.endsWith("/")) path = path.slice(0, -1);
    const pairs = await globImports("./src/pages/**/*{.js,.mdz}")
    let [mask, module] = Object.entries(pairs).find(([route]) =>
      routesMatcher(route, `/${path}`),
    );
    let UIElement, html, params;
    if (isDynamic(mask)) params = dynamicRoutesParser(mask, `/${path}`);
    const {Component, GET, POST, DELETE, UPDATE, head, prerender} = await module
    if(Component){
      UIElement = params ? await Component.call(this, params) : await Component();
      html = renderToString(UIElement);
      // console.log(__Ziko__.__HYDRATION__)
    }

    return {
      head,
      html,
      prerender,
      hydration_map : __Ziko__.__HYDRATION__,
      GET,
      POST,
      DELETE,
      UPDATE,
    };
  };
}
