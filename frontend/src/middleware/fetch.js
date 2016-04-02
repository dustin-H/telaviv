
import fetch from '../fetch'
import combineFetchData from '../utils/combineFetchData.js'

export default (config) => {
  return (req, res, next) => {
    if (req.bauhaus.fetch == null) {
      return next(500)
    }
    fetch(req.bauhaus.fetch, req, res, config, function(err, data) {
      if (err != null) {
        return next(err.status)
      }
      req.bauhaus.fetch.data = combineFetchData(req.bauhaus.fetch.components, data)
      next()
    })
  }
}
