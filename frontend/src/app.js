import express from 'express'

import init from './middleware/init.js'
import router from './middleware/router.js'
import routeTypeParser from './middleware/routeTypeParser.js'
import redirect from './middleware/redirect.js'
import prepareRouteFetch from './middleware/prepareRouteFetch.js'
import fetch from './middleware/fetch.js'
import renderReact from './middleware/renderReact.js'
import generateHtml from './middleware/generateHtml'
import respond from './middleware/respond.js'

import prepareErrorFetch from './middleware/prepareErrorFetch.js'

import config from './config'
import setConfig from './config/setConfig.js'

import staticProvider from './staticProvider'

const errorHandler = (middleware) => {
  return (err, req, res, next) => {
    middleware(req, res, (error) => {
      next(error || err)
    }, err)
  }
}

module.exports = function(c) {
  setConfig(c)
  var app = express()

  app.use((req, res, next) => {
    /*for (var i in require.cache) {
      if (i.search('/themes/') >= 0 || i.search('/node_modules/react-look/') >= 0) {
        delete require.cache[i]
      }
    }*/
    next()
  })

  app.use('/.static', staticProvider(config))

  app.use(init(config))
  app.use(router(config))
  app.use(routeTypeParser(config))
  app.use(redirect(config))
  app.use(prepareRouteFetch(config))
  app.use(fetch(config))
  app.use(renderReact(config))
  app.use(generateHtml(config))
  app.use(respond(config))

  app.use(errorHandler(prepareErrorFetch(config)))
  app.use(errorHandler(fetch(config)))
  app.use(errorHandler(renderReact(config)))
  // app.use(errorHandler(catchErrors(config)))
  app.use(errorHandler(generateHtml(config)))
  app.use(errorHandler(respond(config)))

  return app;
}
