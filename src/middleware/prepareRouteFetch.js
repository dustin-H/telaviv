
export default function() {
  return (req, res, next) => {
    if (req.telaviv.type != null && req.telaviv.route != null && req.telaviv.route.route != null && req.telaviv.route.route[req.telaviv.type] != null && req.telaviv.route.params != null) {
      req.telaviv.fetch = {
        components: req.telaviv.route.route[req.telaviv.type],
        params: req.telaviv.route.params
      }
      return next()
    }
    next(404)
  }
}
