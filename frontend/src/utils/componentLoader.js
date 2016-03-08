
import isServer from './isServer.js'

export default function(name) {
  if (isServer === true) {
    var req = require
    var config = req('../config')
    return req('../themes/' + config.theme + '/' + name)
  } else {
    // Client Side
    return false
  }
}
