
import matchRoutes from '../router/matchRoutes.js'

export default function(config) {
  return (req, res, next) => {
    req.bauhaus.route = matchRoutes(config.routes, req.path)
    if (req.bauhaus.route === false) {
      res.status(404)
      return next(404)
    }
    next()
  }
}
