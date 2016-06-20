
import express from 'express'
import telaviv from './app.js'
import {resolve} from 'path'

let mid
let old

export function setConfig(config) {
  mid = telaviv(config, old)
  old = config
  return config
}

export function clearModuleCache() {
  var clearPath = resolve(old.buildPath, 'server')
  var c = 0
  for(var i in require.cache){
    if(i.startsWith(clearPath)) {
      delete require.cache[require.resolve(i)]
      c++
    }
  }
  for(var i in old.components){
    old.components[i] = 'c' + old.componentCounter.toString(36) + '-'
    old.componentCounter++
  }
  console.warn('Telaviv.JS: clearModuleCache() => You should NOT do this in production! Instead restart your node process! Otherwise you will get out of memory after some cache clears!')
  return c
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
