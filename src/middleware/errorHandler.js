
export default (middleware) => {
  return (err, req, res, next) => {
    middleware(req, res, (error) => {
      next(error || err)
    }, err)
  }
}
