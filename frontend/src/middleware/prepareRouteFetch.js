
export default function() {
  return (req, res, next) => {
    if (req.bauhaus.type != null && req.bauhaus.route != null && req.bauhaus.route.route != null && req.bauhaus.route.route[req.bauhaus.type] != null && req.bauhaus.route.params != null) {
      req.bauhaus.fetch = {
        components: req.bauhaus.route.route[req.bauhaus.type],
        params: req.bauhaus.route.params
      }
      return next()
    }
    next(404)
  }
}
