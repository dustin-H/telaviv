
import fetch from '../fetch'
import combineFetchData from '../utils/combineFetchData.js'

export default (config) => {
  return (req, res, next) => {
    if (req.telaviv.fetch == null) {
      return next(500)
    }
    fetch(req.telaviv.fetch, req, res, config, function(err, data) {
      if (err != null) {
        return next(err.status)
      }
      req.telaviv.fetch.data = combineFetchData(req.telaviv.fetch.components, data, req.telaviv.fetch.params)
      next()
    })
  }
}
