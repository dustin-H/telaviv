
import superagent from 'superagent'
import parseCacheControl from 'parse-cache-control'
import url from 'url'
import { replaceAllParams } from '../utils/replace.js'

var generateCacheHeader = function(c) {
  if (c.noStore === true && c.noCache === true) {
    return 'no-cache, no-store'
  }
  if (c.noCache === true) {
    return 'no-cache'
  }
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

export default (fetch, req, res, config, cb) => {
  var components = fetch.components
  var params = fetch.params
  var k = 0
  var data = {}
  var mostImportantError = null
  var header = {cache: {}, cookie: []}

  let response = (component, err, superres) => {
    k--
    if (err != null) {
      if (mostImportantError == null) {
        mostImportantError = err
      } else {
        if (err.status >= 400 && err.status < 600 && err.status < mostImportantError.status) {
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
          if (cache['no-store'] === true) {
            header.cache.noStore = true
          }
        }
      }

      if (superres.header['set-cookie'] != null) {
        var cookieArray = superres.header['set-cookie']
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

  let request = (component) => {
    if (component.data != null && component.data.url != null) {
      k++
      var requestUrl = url.resolve(config.apiAddress, component.data.url)
      requestUrl = replaceAllParams(requestUrl, params)
      superagent.get(requestUrl).set(req.headers).accept('json').end((err, superres) => {
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
