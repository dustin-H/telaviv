
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

module.exports = function(elements, params, req, res, cb) {
  var k = 0
  var data = {}
  var mostImportantError = null
  var headers = {cache: {}, cookie: []}

  var response = function(element, err, res) {
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
      data[element.component] = res.body

      if (res.header['cache-control'] != null) {
        var cache = parseCacheControl(res.header['cache-control'])

        if (cache != null) {
          if (cache['max-age'] != null && typeof cache['max-age'] === 'number' && (headers.cache.maxAge == null || headers.cache.maxAge > cache['max-age'])) {
            headers.cache.maxAge = cache['max-age']
          }
          if (cache.private === true) {
            headers.cache.private = true
          }
          if (cache.public === true) {
            headers.cache.public = true
          }
          if (cache['no-cache'] === true) {
            headers.cache.noCache = true
          }
        }
      }

      if (res.header['set-cookie'] != null) {
        header.cookie = header.cookie.concat(res.header['set-cookie'].split(';'))
      }
    }

    if (k < 1) {
      if (mostImportantError == null) {
        var cacheValue = generateCacheHeader(headers.cache);
        if (cacheValue.length > 0) {
          res.set('cache-control', cacheValue)
        }
        if (headers.cookie.length > 0) {
          for (var i in headers.cookie) {
            headers.cookie[i] = headers.cookie[i].trim()
          }
          res.set('set-cookie', headers.cookie.join('; '))
        }
      }

      cb(mostImportantError, data)
    }
  }

  var request = function(element) {
    if (element.data != null && element.data.url != null) {
      k++
      var requestUrl = url.resolve(config.address.api, element.data.url)
      requestUrl = replaceAllParams(requestUrl, params)
      superagent.get(requestUrl).set(req.headers).accept('json').end(function(err, res) {
        response(element, err, res)
      })
    }
  }

  for (var i in elements) {
    request(elements[i])
  }
  if (k < 1) {
    return cb(mostImportantError, data)
  }
}
