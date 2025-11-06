import {
  // customPath,
  // routesMatcher,
  dynamicRoutesParser,
  isDynamic,
} from "../utils/index.js";
import { 
  renderToString,
  globImports
 } from "../server-only-utils/index.js";

 import { 
  routesMatcher,
  dynamicRoutesParser,
  isDynamic
 } from "../utils/routes-matcher-exp.js";

export function EntryServer() {
  return async function render(path) {
    if(path.endsWith("/")) path = path.slice(0, -1);

    const pairs = await globImports("./src/pages/**/*{.js,.mdz}")
    let [mask, module] = Object.entries(pairs).find(([route]) =>
      routesMatcher(route, `/${path}`),
    );
    // console.log({module})
    let UIElement, html, params;
    if (isDynamic(mask)) {
      params = dynamicRoutesParser(mask, `/${path}`);
      UIElement = await module.handler.call(this, params);
    } 
    const {Component, GET, POST, DELETE, UPDATE, head} = await module

    if(Component){
      UIElement = params ? await module.Component.call(this, params) : await module.Component();
      html = renderToString(UIElement);
    }

    return {
      head,
      html,
      GET,
      POST,
      DELETE,
      UPDATE
    };
  };
}
