
import express from 'express'
import config from '../config'

export default () => {

  var app = express()

  var bundlePath = require.resolve('../../client-build/bundle.js')
  var themesPath = bundlePath.split('bundle.js')[0] + 'themes/'

  /*app.use((req, res, next) => {
    setTimeout(() => {
      next()
    }, 500)
  })*/

  app.use('/bundle.js', express.static(bundlePath))

  app.use('/components', express.static(themesPath + config.theme + '/'))

  return app

}
