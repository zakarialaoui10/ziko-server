import { define_derictives } from "../code-splitter/directives.js";
export function hydration_setup(req, res, next) {
  globalThis.Ziko = {}
  define_derictives()
  if(globalThis?.__Ziko__) __Ziko__.__HYDRATION__.reset();
  next(); 
}