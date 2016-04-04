
export default function() {
  return (req, res, next) => {
    if (req.telaviv.route.route.redirect != null) {
      req.telaviv.type = 'redirect'
      return next()
    }
    if (req.telaviv.route.route.html5 != null && req.telaviv.route.route.amphtml != null) {
      req.telaviv.ampAndHtml5 = true
      if (req.query.amp === 1 || req.query.amp === '1' || req.query.amp === true || req.query.amp === 'true') {
        req.telaviv.type = 'amphtml'
      } else {
        req.telaviv.amphtml = req.telaviv.canonical + '?amp=1'
        req.telaviv.canonical = null
        req.telaviv.type = 'html5'
      }
      return next()
    }
    if (req.telaviv.route.route.html5 != null) {
      req.telaviv.type = 'html5'
      return next()
    }
    if (req.telaviv.route.route.amphtml != null) {
      req.telaviv.type = 'amphtml'
      return next()
    }
    next(404)
  }
}
