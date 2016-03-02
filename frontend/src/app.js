var express = require('express')
var path = require('path')
var config = require('./config')
var matchRoutes = require('./router/matchRoutes.js')

var render = require('./render')
var redirect = require('./render/redirect.js')

var templates = require('./templates')

module.exports = function() {
  var app = express()

  app.use(templates)
  app.use('/.statics', function(req, res, next) {
    next();
  })
  app.use(function(req, res, next) {
    req.bauhaus = req.bauhaus || {}
    req.bauhaus.time = process.hrtime();
    req.bauhaus.canonical = path.join(config.address.own, req.path)
    var route = matchRoutes(config.routes, req.path)
    if (route === false) {
      return res.status(404).send('Not found!')
    }
    if (route.route.redirect != null) {
      return redirect(route, req, res)
    }
    if (route.route.html5 != null && route.route.amphtml != null) {
      req.bauhaus.ampAndHtml5 = true
      if (req.query.amp === 1 || req.query.amp === '1' || req.query.amp === true || req.query.amp === 'true') {
        return render('amphtml', route, req, res, next)
      } else {
        req.bauhaus.amphtml = req.bauhaus.canonical + '?amp=1'
        req.bauhaus.canonical = null
        return render('html5', route, req, res, next)
      }
    }
    if (route.route.html5 != null) {
      return render('html5', route, req, res, next)
    }
    if (route.route.amphtml != null) {
      return render('amphtml', route, req, res, next)
    }
    next();
  })

  return app;
}
