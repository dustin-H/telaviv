
import renderReact from '../app/server.js'

export default function(config) {
  return (req, res, next) => {
    req.telaviv.renderData = null
    if (req.telaviv.fetch == null || req.telaviv.fetch.data == null) {
      return next(500)
    }
    let renderData = renderReact(req.telaviv.fetch.data, req, res, config)
    if (renderData == null) {
      // When renderData is null some react component has redirected the request
      return
    }
    req.telaviv.renderData = renderData
    next()
  }
}
