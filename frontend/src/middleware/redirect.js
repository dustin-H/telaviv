
export default function() {
  return (req, res, next) => {
    if (req.bauhaus.type !== 'redirect') {
      return next()
    }
    if (req.bauhaus.route.route.redirect.code != null) {
      return res.redirect(req.bauhaus.route.route.redirect.code, req.bauhaus.route.route.redirect.url)
    } else {
      return res.redirect(req.bauhaus.route.route.redirect.url)
    }
  }
}
