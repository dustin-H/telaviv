
import renderReact from '../app/server.js'

export default function() {
  return (req, res, next) => {
    req.bauhaus.renderData = null
    if (req.bauhaus.fetch == null || req.bauhaus.fetch.data == null) {
      return next(true)
    }
    let renderData = renderReact(req.bauhaus.fetch.data, req, res)
    if (renderData != null) {
      req.bauhaus.renderData = renderData
      return next()
    }
    next(true)
  }
}
