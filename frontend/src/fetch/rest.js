
var superagent = require('superagent')
var parseCacheControl = require('parse-cache-control')
var url = require('url');
import config from '../config'
import { replaceAllParams } from '../utils/replace.js'

var generateCacheHeader = function(c) {
  if (c.noStore === true) {
    return 'no-store'
  }
  var ret = []
  if (c.private === true) {
    ret.push('private')
  }
  if (c.public === true && c.private !== true) {
    ret.push('public')
  }
  if (c.maxAge != null) {
    ret.push('max-age=' + c.maxAge)
  }
  return ret.join(', ')
}

module.exports = function(fetch, req, res, cb) {
  var components = fetch.components
  var params = fetch.params
  var k = 0
  var data = {}
  var mostImportantError = null
  var header = {cache: {}, cookie: []}

  var response = function(component, err, superres) {
    k--
    if (err != null) {
      if (mostImportantError == null) {
        mostImportantError = err
      } else {
        if (err.status >= 500 && err.status < 600 && err.status < mostImportantError.status) {
          mostImportantError = err
        }
        if (err.status >= 400 && err.status < 500 && err.status < mostImportantError.status) {
          mostImportantError = err
        }
      }
    } else {
      data[component.component] = superres.body

      if (superres.header['cache-control'] != null) {
        var cache = parseCacheControl(superres.header['cache-control'])

        if (cache != null) {
          if (cache['max-age'] != null && typeof cache['max-age'] === 'number' && (header.cache.maxAge == null || header.cache.maxAge > cache['max-age'])) {
            header.cache.maxAge = cache['max-age']
          }
          if (cache.private === true) {
            header.cache.private = true
          }
          if (cache.public === true) {
            header.cache.public = true
          }
          if (cache['no-cache'] === true) {
            header.cache.noCache = true
          }
        }
      }

      if (superres.header['set-cookie'] != null) {
        var cookieArray = superres.header['set-cookie']
        if (typeof cookieArray === 'string') {
          cookieArray = [cookieArray]
        }
        header.cookie = header.cookie.concat(superres.header['set-cookie'])
      }
    }

    if (k < 1) {
      if (mostImportantError == null) {
        var cacheValue = generateCacheHeader(header.cache);
        if (cacheValue.length > 0) {
          res.set('Cache-Control', cacheValue)
        }
        if (header.cookie.length > 0) {
          res.set('Set-Cookie', header.cookie)
        }
      }

      cb(mostImportantError, data)
    }
  }

  var request = function(component) {
    if (component.data != null && component.data.url != null) {
      k++
      var requestUrl = url.resolve(config.address.api, component.data.url)
      requestUrl = replaceAllParams(requestUrl, params)
      superagent.get(requestUrl).set(req.headers).accept('json').end(function(err, superres) {
        response(component, err, superres)
      })
    }
  }

  for (var i in components) {
    request(components[i])
  }
  if (k < 1) {
    return cb(mostImportantError, data)
  }
}
