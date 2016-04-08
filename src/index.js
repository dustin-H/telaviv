
import express from 'express'
import telaviv from './app.js'
let mid
let old

export function setConfig(config) {
  mid = telaviv(config, old)
  return config
}

export function server(config) {
  let app = express()
  mid = telaviv(config)
  old = config

  /* istanbul ignore next because it's too simple */
  app.use((err, req, res, next) => {
    mid(err, req, res, next)
  })
  /* istanbul ignore next because it's too simple */
  app.use((req, res, next) => {
    mid(req, res, next)
  })

  return app
}

export default server
