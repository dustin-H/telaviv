
import superagent from 'superagent'
import { replaceAllParams } from '../../utils/replace.js'

module.exports = function(fetch, cb) {
  var components = fetch.components
  var params = fetch.params
  var k = 0
  var data = {}

  var response = function(component, err, superres) {
    if (err != null) {
      return cb(err)
    }
    data[component.component] = superres.body
    k--
    if (k < 1) {
      cb(null, data)
    }
  }

  var request = function(component) {
    console.log(component);
    if (component.data != null && component.data.url != null) {
      k++
      var requestUrl = replaceAllParams(component.data.url, params)
      superagent.get(requestUrl).accept('json').end(function(err, superres) {
        response(component, err, superres)
      })
    }
  }

  for (var i in components) {
    request(components[i])
  }
  if (k < 1) {
    return cb(null, data)
  }
}
