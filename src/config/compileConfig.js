
import { compilePattern } from '../router/pathMatcher.js'
const contentTypes = ['html5', 'amphtml']
const pathRegExp = new RegExp('/', 'g')

export default (c, old = {}) => {
  c.theme = c.theme || old.theme || 'default'
  c.routes = c.routes || old.routes || []
  if (old.theme != null && c.theme !== old.theme) {
    c.theme = old.theme
    console.error('Telaviv: Config.theme can\'t get changed on runtime!')
  }
  c.components = old.components || {}
  c.componentCounter = old.componentCounter || 0
  for (let i in c.routes) {
    let route = c.routes[i]
    route._params = compilePattern(route.path).paramNames
    route._depth = route.path.match(pathRegExp).length
    for (var k in contentTypes) {
      let type = contentTypes[k]
      if (route[type] != null) {
        for (var j in route[type]) {
          if (route[type][j].component) {
            if (c.components[route[type][j].component] == null) {
              c.components[route[type][j].component] = 'c' + c.componentCounter.toString(36) + '-'
              c.componentCounter++
            }
          }
        }
      }
    }
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
    if (route.internal !== true && route.html5 != null && route.redirect == null && route.path != null) {
      var exportRoute = {html5: route.html5, path: route.path}
      c.clientRoutes.push(exportRoute)
    }
  }

  c.buildPath = c.buildPath || old.buildPath || 'build'
  c.staticCacheControl = c.staticCacheControl || old.staticCacheControl || 'max-age=60'
  c.errors = c.errors || old.errors || []
  c.apiAddress = c.apiAddress || old.apiAddress || 'http://localhost/'

  return Object.assign({}, c)
}
