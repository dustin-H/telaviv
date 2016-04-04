
export default function() {
  return (req, res, next) => {
    if (req.telaviv.type !== 'redirect') {
      return next()
    }
    if (req.telaviv.route.route.redirect.code != null) {
      return res.redirect(req.telaviv.route.route.redirect.code, req.telaviv.route.route.redirect.url)
    } else {
      return res.redirect(req.telaviv.route.route.redirect.url)
    }
  }
}
