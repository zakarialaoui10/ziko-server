import {
    customPath,
    routesMatcher,
    dynamicRoutesParser,
    isDynamic,
  } from "../utils/index.js";
export function EntryClient({pages}={}){
  pages = import.meta.glob("/src/pages/**/*{.js,.mdz}")
  addEventListener("load", (async () => {
    const routes = Object.keys(pages);
    const root = "./pages/";
    const pairs = {};
    for (let i = 0; i < routes.length; i++) {
      const module = await pages[routes[i]]();
      const component = await module.default;
      Object.assign(pairs, { [customPath(routes[i], root)]: component });
    }
    async function hydrate(path) {
      if(path.endsWith("/")) path = path.slice(0, -1);
      let [mask, callback] = Object.entries(pairs).find(([route]) =>
        routesMatcher(route, `/${path}`),
      );
      let UIElement;
      if (isDynamic(mask)) {
        const params = dynamicRoutesParser(mask, `/${path}`);
        UIElement = await callback.call(this, params);
      } 
      else UIElement = await callback();
      document.body.replaceWith(UIElement.element);  // To Fix ( replace intercative elements only )
    }
    hydrate(location.pathname.slice(1));
  }))
}
