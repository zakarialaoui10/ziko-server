export function global(req, res, next) {
  globalThis.Ziko = { }
  if(globalThis?.__Ziko__) __Ziko__.__HYDRATION__.reset()
  next(); 
}