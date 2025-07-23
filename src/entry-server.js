import {
  customPath,
  routesMatcher,
  dynamicRoutesParser,
  isDynamic,
} from "./utils/index.js";

import { renderToString } from "./server-only-utils/renderToString.js"

export function EntryServer({ pages } = {}) {
  return async function render(path) {
    const routes = Object.keys(pages);
    const root = "./pages/";
    const pairs = {};
    for (let i = 0; i < routes.length; i++) {
      const module = await pages[routes[i]]();
      const component = await module.default;
      Object.assign(pairs, { [customPath(routes[i], root)]: component });
      console.log({component})
    }
    let [mask, callback] = Object.entries(pairs).find(([route]) =>
      routesMatcher(route, `/${path}`),
    );
    console.log({mask, callback})
    let UIElement;
    if (isDynamic(mask)) {
      const params = dynamicRoutesParser(mask, `/${path}`);
      UIElement = callback.call(this, params);
    } 
    else UIElement = await callback();

    const html = renderToString(UIElement);
    return {
      // head,
      html,
    };
  };
}

export const defineServerEntry = ({ pages }) => () => EntryServer({ pages });