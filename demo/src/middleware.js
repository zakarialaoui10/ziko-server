export function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); // pass control to the next middleware or route
}