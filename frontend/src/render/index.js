
var fetch = require('../fetch')
var config = require('../config')
var combineFetchData = require('./combineFetchData.js')
var renderReact = require('../app/server.js')
var httpStatusCodes = require('http-status-codes')
import getErrorRoute from './getErrorRoute.js'

var render = function(type, route, req, res, next) {
  fetch(route.route[type], route.params, req, res, function(err, data) {
    if (err != null) {
      res.status(err.status)
      if (req.bauhaus.errorCode != null) {
        return res.bauhaus.renderHTML(type, {
          errorCode: req.bauhaus.errorCode
        })
      }
      var errorRoute = getErrorRoute(err, type)
      if (errorRoute != null) {
        req.bauhaus.errorCode = err.status
        return render(type, errorRoute, req, res, next)
      } else {
        return res.bauhaus.renderHTML(type, {
          errorCode: err.status
        })
      }
    }
    var initialData = combineFetchData(route.route[type], data)
    // Now lets finally render
    renderReact(initialData, req, function(content, styles, state) {
      return res.bauhaus.renderHTML(type, {
        content: content,
        styles: styles,
        state: state
      })
    })

  })
}

module.exports = render
