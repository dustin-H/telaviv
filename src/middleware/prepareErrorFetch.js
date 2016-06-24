
import matchErrorRoutes from '../router/matchErrorRoutes.js'

export default function(config) {
  return (req, res, next, err) => {
    console.log(err.stack)

    if(typeof err === 'number' && err >= 400 && err < 600){
      res.status(err)
    }
    if(res.statusCode === 200){
      res.status(500)
    }
    req.telaviv.fetch = null
    req.telaviv.clientRendering = false

    let errorRoute = matchErrorRoutes(res.statusCode, req.telaviv.type, config)
    if (errorRoute != null) {
      req.telaviv.fetch = {
        components: errorRoute.route[req.telaviv.type],
        params: errorRoute.params
      }
    }
    next()
  }
}
