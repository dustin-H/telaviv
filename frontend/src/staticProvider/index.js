
import express from 'express'

export default (config) => {

  var app = express()

  var bundlePath = require.resolve('../../client-build/bundle.js')
  var themesPath = bundlePath.split('bundle.js')[0] + 'themes/'

  app.use('/bundle.js', express.static(bundlePath))

  app.use('/components', express.static(themesPath + config.theme + '/'))

  return app

}
