
var rest = require('./rest.js')

module.exports = function(fetch, req, res, cb){
  // Because there is only REST
  rest(fetch, req, res, cb)
}
