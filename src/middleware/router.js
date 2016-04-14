
import matchRoutes from '../router/matchRoutes.js'

export default function(config) {
  return (req, res, next) => {
    req.telaviv.route = matchRoutes(config.routes, req.path)
    if (req.telaviv.route === false || req.telaviv.route.route.internal === true) {
      return next(404)
    }
    next()
  }
}
