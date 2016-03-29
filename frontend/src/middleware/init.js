
import url from 'url'

export default function(config) {
  return (req, res, next) => {
    req.bauhaus = req.bauhaus || {}

    /* istanbul ignore if */
    if (process.env.NODE_ENV === 'development') {
      req.bauhaus.timetracking = {start: process.hrtime()}
    }

    req.bauhaus.canonical = url.resolve(config.address.own, req.path)
    next()
  }
}
