
import fetch from '../fetch'
import combineFetchData from '../utils/combineFetchData.js'

export default function() {
  return (req, res, next) => {
    if (req.bauhaus.fetch == null) {
      return next(true)
    }
    fetch(req.bauhaus.fetch, req, res, function(err, data) {
      if (err != null) {
        res.status(err.status)
        return next(err)
      }
      req.bauhaus.fetch.data = combineFetchData(req.bauhaus.fetch.components, data)
      next()
    })
  }
}
