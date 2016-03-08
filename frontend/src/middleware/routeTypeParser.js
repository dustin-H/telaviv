
export default function() {
  return (req, res, next) => {
    if (req.bauhaus.route.route.redirect != null) {
      req.bauhaus.type = 'redirect'
      return next()
    }
    if (req.bauhaus.route.route.html5 != null && req.bauhaus.route.route.amphtml != null) {
      req.bauhaus.ampAndHtml5 = true
      if (req.query.amp === 1 || req.query.amp === '1' || req.query.amp === true || req.query.amp === 'true') {
        req.bauhaus.type = 'amphtml'
      } else {
        req.bauhaus.amphtml = req.bauhaus.canonical + '?amp=1'
        req.bauhaus.canonical = null
        req.bauhaus.type = 'html5'
      }
      return next()
    }
    if (req.bauhaus.route.route.html5 != null) {
      req.bauhaus.type = 'html5'
      return next()
    }
    if (req.bauhaus.route.route.amphtml != null) {
      req.bauhaus.type = 'amphtml'
      return next()
    }
    next(404)
  }
}
