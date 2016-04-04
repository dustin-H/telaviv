
import { compilePattern } from '../router/pathMatcher.js'
const contentTypes = ['html5', 'amphtml']
const pathRegExp = new RegExp('/', 'g')

export default (c) => {
  c.components = {}
  let componentCounter = 0
  for (let i in c.routes) {
    let route = c.routes[i]
    route._params = compilePattern(route.path).paramNames
    route._depth = route.path.match(pathRegExp).length
    for (var k in contentTypes) {
      let type = contentTypes[k]
      if (route[type] != null) {
        for (var j in route[type]) {
          if(route[type][j].component){
            if(c.components[route[type][j].component] == null){
              c.components[route[type][j].component] = 'c'+componentCounter.toString(36)+'-'
              componentCounter++
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
    if (route.html5 != null && route.redirect == null && route.path != null) {
      var exportRoute = {html5: route.html5, path: route.path}
      c.clientRoutes.push(exportRoute)
    }
  }

  return Object.assign({}, c)
}