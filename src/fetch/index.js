
import rest from './rest.js'

export default (fetch, req, res, config, cb) => {
  // Because there is only REST
  rest(fetch, req, res, config, cb)
}
