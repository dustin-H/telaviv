
var isServer = true;
if (typeof __GLOBAL_INITIAL_REDUX_STATE__ !== 'undefined') {
  isServer = false;
}

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