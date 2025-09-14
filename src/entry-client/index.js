import {
    customPath,
    routesMatcher,
    dynamicRoutesParser,
    isDynamic,
  } from "../utils/index.js";
export function EntryClient({base = '', pages}={}){
  if(import.meta.env.DEV) pages = import.meta.glob("/src/pages/**/*{.js,.mdz}")
  // else pages = Object({
  //   '/src/pages/index.js' : ()=>import('/src/pages/index.js'),
  //   // '/src/pages/me.js' : ()=>import('/src/pages/me.js'),
  //   '/src/pages/about/index.js' : ()=>import('/src/pages/about/index.js')
  // })
  addEventListener("load", (async () => {
    if(import.meta.env.PROD) pages = (await import(/* @vite-ignore */`${base}/.generated-routes.js`)).pages
    console.log(pages)
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
      console.log({
        path,
        mask,
        callback
      })
      let UIElement;
      if (isDynamic(mask)) {
        const params = dynamicRoutesParser(mask, `/${path}`);
        UIElement = await callback.call(this, params);
      } 
      else UIElement = await callback();
      document.body.innerHTML = ""
      document.body.append(UIElement.element)
      // document.body.replaceWith(UIElement.element);
      // To Fix ( replace intercative elements only )
    }
    hydrate(location.pathname.slice(1));
  }))
}
