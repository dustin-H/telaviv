
import matchErrorRoutes from '../router/matchErrorRoutes.js'

export default function(config) {
  return (req, res, next, err) => {
    if(typeof err === 'number' && err >= 400 && err < 600){
      res.status(err)
    }
    if(res.statusCode === 200){
      res.status(500)
    }
    req.bauhaus.fetch = null
    req.bauhaus.clientRendering = false

    let errorRoute = matchErrorRoutes(res.statusCode, req.bauhaus.type, config)
    if (errorRoute != null) {
      req.bauhaus.fetch = {
        components: errorRoute.route[req.bauhaus.type],
        params: errorRoute.params
      }
    }
    next()
  }
}
