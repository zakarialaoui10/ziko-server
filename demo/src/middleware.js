export function logger(req, res, next) {
  Object.assign(req, {
    locals : {
      user : 'zakaria'
    }
  })
  globalThis.Ziko = {
    locals : {
      name : 'zakaria'
    }
  }
  if(globalThis?.__Ziko__){
    __Ziko__.__HYDRATION__.reset()
  }
  // console.log(`${req.method} ${req.url}`);
  next(); // pass control to the next middleware or route
}