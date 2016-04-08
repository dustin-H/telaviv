
const hasFetchData = (data) => {
  for (var i in data) {
    if (data[i].data != null) {
      return true
    }
  }
  return false
}

export default function(config) {
  return (req, res, next) => {
    let cc = res.get('cache-control')
    if (res.statusCode === 200 && cc == null && hasFetchData(req.telaviv.fetch.components) === false) {
      res.set('Cache-Control', config.staticCacheControl)
    }
    next()
  }
}
