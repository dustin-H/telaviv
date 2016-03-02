
var rest = require('./rest.js')

module.exports = function(components, params, req, res, cb){
  // Because there is only REST
  rest(components, params, req, res, cb)
}
