
import url from 'url'
import config from '../config'

import { replaceAll } from '../utils/replace.js'
import matchRoutes from '../router/matchRoutes.js'

const getErrorRoute = (code, requiredContent) => {
  for (var i in config.errors) {
    var e = config.errors[i]
    if (code >= e.from && code <= e.to) {
      let path = replaceAll(e.path, ':code', code)
      let route = matchRoutes(config.routes, path)
      if (route.route[requiredContent] != null) {
        return route
      }
    }
  }
  return null
}

export default function() {
  return (req, res, next) => {
    if(res.statusCode === 200){
      res.status(500)
    }
    req.bauhaus.fetch = null
    req.bauhaus.errorCode = res.statusCode

    if (req.bauhaus.type == null) {
      req.bauhaus.ampAndHtml5 = true
      req.bauhaus.canonical = url.resolve(config.address.own, req.path)
      if (req.query.amp === 1 || req.query.amp === '1' || req.query.amp === true || req.query.amp === 'true') {
        req.bauhaus.type = 'amphtml'
      } else {
        req.bauhaus.amphtml = req.bauhaus.canonical + '?amp=1'
        req.bauhaus.canonical = null
        req.bauhaus.type = 'html5'
      }
    }

    let errorRoute = getErrorRoute(res.statusCode, req.bauhaus.type)
    if (errorRoute != null) {
      req.bauhaus.fetch = {
        components: errorRoute.route[req.bauhaus.type],
        params: errorRoute.params
      }
      return next()
    }
    next(true)
  }
}
