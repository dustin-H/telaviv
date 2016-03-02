
var config = require('../config')

import {replaceAll} from '../utils/replace.js'

module.exports = function(err, requiredContent){
  for(var i in config.errors){
    var e = config.errors[i]
    if(err.status >= e.from && err.status <= e.to){
      var path = replaceAll(e.path, ':code', err.status)
      for(var j in config.routes){
        if(config.routes[j].path === path && config.routes[j][requiredContent] != null){
          return config.routes[j]
        }
      }
    }
  }
  return null
}
