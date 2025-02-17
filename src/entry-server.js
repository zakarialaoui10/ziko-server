import {JSDOM} from "jsdom"
import {customPath, routesMatcher, dynamicRoutesParser, isDynamic} from "./utils/index.js"
const {document} = new JSDOM().window;
globalThis.document = document


export function EntryServer({pages}={}){
  return async function render(path) {
  const routes = Object.keys(pages)
  const root = "./pages/";
  const pairs = {}
  for(let i=0; i<routes.length; i++){
    const module = await pages[routes[i]]()
    const component = await module.default
    Object.assign(pairs,{[customPath(routes[i], root)]:component})
  }
  let [mask, callback]=Object.entries(pairs).find(([route,])=>routesMatcher(route,`/${path}`))
  // console.log({mask, callback})
  let UIElement;
  if(isDynamic(mask)){
    const params = dynamicRoutesParser(mask, `/${path}`)
    // console.log({params})
    UIElement = callback.call(this,params)
  }
  else UIElement = await callback()
  // console.log(UIElement)

  const html = UIElement.element.outerHTML
  return { 
    // head,
    html
   }
}
}

export const defineServerEntry=({pages})=>()=>EntryServer({pages})
