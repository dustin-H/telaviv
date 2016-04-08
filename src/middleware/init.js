
import url from 'url'

export default function(config) {
  return (req, res, next) => {
    req.telaviv = req.telaviv || {}

    /* istanbul ignore if */
    if (process.env.NODE_ENV === 'development') {
      req.telaviv.timetracking = {start: process.hrtime()}
    }

    req.telaviv.canonical = url.resolve(req.path)
    next()
  }
}
