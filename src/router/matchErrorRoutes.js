
import matchRoutes from './matchRoutes.js'
import { replaceAll } from '../utils/replace.js'

export default (code, requiredContent, config) => {
  for (var i in config.errors) {
    var e = config.errors[i]
    if (code >= e.from && code <= e.to) {
      let pathname = replaceAll(e.path, ':code', code)
      let route = matchRoutes(config.routes, pathname)
      if (route !== false && route.route[requiredContent] != null) {
        return route
      }
    }
  }
  return null
}
