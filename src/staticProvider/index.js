
import express from 'express'

export default (config) => {

  var app = express()

  var bundlePath = require.resolve('../../client-build/bundle.js')
  var themesPath = bundlePath.split('bundle.js')[0] + 'themes/'
  var telavivPath = require.resolve('../../img/icon_small.png')

  app.use('/bundle.js', express.static(bundlePath))

  app.use('/components', express.static(themesPath + config.theme + '/'))

  app.use('/telaviv.png', express.static(telavivPath))

  return app

}
