
import url from 'url'
import config from '../config'

export default function() {
  return (req, res, next) => {
    req.bauhaus = req.bauhaus || {}
    req.bauhaus.time = process.hrtime()
    req.bauhaus.canonical = url.resolve(config.address.own, req.path)
    res.bauhaus = res.bauhaus || {}
    next()
  }
}
