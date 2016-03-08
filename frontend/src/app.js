var express = require('express')

import init from './middleware/init.js'
import router from './middleware/router.js'
import routeTypeParser from './middleware/routeTypeParser.js'
import redirect from './middleware/redirect.js'
import prepareRouteFetch from './middleware/prepareRouteFetch.js'
import fetch from './middleware/fetch.js'
import renderReact from './middleware/renderReact.js'
import generateHtml from './middleware/generateHtml.js'
import respond from './middleware/respond.js'

import prepareErrorFetch from './middleware/prepareErrorFetch.js'
import catchErrors from './middleware/catchErrors.js'

const errorHandler = (middleware) => {
  return (err, req, res, next) => {
    middleware(req, res, (error) => {
      next(error || err)
    }, err)
  }
}

module.exports = function() {
  var app = express()

  app.use('/.statics', function(req, res, next) {
    next();
  })

  app.use(init())
  app.use(router())
  app.use(routeTypeParser())
  app.use(redirect())
  app.use(prepareRouteFetch())
  app.use(fetch())
  app.use(renderReact())
  app.use(generateHtml())
  app.use(respond())

  app.use(errorHandler(prepareErrorFetch()))
  app.use(errorHandler(fetch()))
  app.use(errorHandler(renderReact()))
  app.use(errorHandler(catchErrors()))
  app.use(errorHandler(generateHtml()))
  app.use(errorHandler(respond()))

  return app;
}
