
import express from 'express'
import { resolve } from 'path'

export default (config) => {

  var app = express()
  var bundlePath = require.resolve('../../lib/bundle.js')
  var themePath = resolve(config.buildPath, 'client', config.theme)
  var telavivPath = require.resolve('../../img/icon_small.png')

  app.use('/bundle.js', express.static(bundlePath))

  app.use('/components', express.static(themePath))

  app.use('/telaviv.png', express.static(telavivPath))

  return app

}
