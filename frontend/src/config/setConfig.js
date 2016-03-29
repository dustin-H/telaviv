
var config = require('./index.js')
import { compilePattern } from '../router/pathMatcher.js'

export default (c) => {

  for (let i in c.routes) {
    let route = c.routes[i]
    route._params = compilePattern(route.path).paramNames
    route._depth = route.path.match(new RegExp('/', 'g') || []).length
  }

  c.routes.sort(function(a, b) {
    if (a._depth > b._depth) {
      return -1
    }
    if (a._depth < b._depth) {
      return 1
    }
    if (a._params > b._params) {
      return 1
    }
    if (a._params < b._params) {
      return -1
    }
    return 0
  })

  c.clientRoutes = []
  for (let i in c.routes) {
    let route = c.routes[i]
    if (route.html5 != null && route.redirect == null && route.path != null) {
      var exportRoute = {html5: route.html5, path: route.path}
      c.clientRoutes.push(exportRoute)
    }
  }

  config = Object.assign(config, c)
}
