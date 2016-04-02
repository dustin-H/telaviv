
import renderReact from '../app/server.js'

export default function(config) {
  return (req, res, next) => {
    req.bauhaus.renderData = null
    if (req.bauhaus.fetch == null || req.bauhaus.fetch.data == null) {
      return next(500)
    }
    let renderData = renderReact(req.bauhaus.fetch.data, req, res, config)
    if (renderData == null) {
      // When renderData is null some react component has redirected the request
      return
    }
    req.bauhaus.renderData = renderData
    next()
  }
}
