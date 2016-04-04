import pathMatcher from './pathMatcher.js'

var matchRoutes = function(routes, pathname) {
  for (var i in routes) {
    var route = routes[i]
    var match = pathMatcher(route.path, pathname)
    if (match.paramValues != null && match.paramNames != null && match.paramValues.length === match.paramNames.length) {
      var params = {}
      for (var j in match.paramNames) {
        params[match.paramNames[j]] = match.paramValues[j]
      }
      return {
        route: route,
        i: i,
        params: params
      }
    }
  }
  return false
}

export default matchRoutes
