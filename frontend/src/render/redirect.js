
module.exports = function(route, req, res){
  if (route.redirect.code != null) {
    return res.redirect(route.redirect.code, route.redirect.url)
  } else {
    return res.redirect(route.redirect.url)
  }
}
