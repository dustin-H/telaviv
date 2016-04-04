
import matchRoutes from '../../router/matchRoutes.js'
import getComponentsFromRoute from './getComponentsFromRoute.js'
import { ensureComponents } from '../loader'
import fetch from './fetch.js'
import async from 'async'
import combineFetchData from '../../utils/combineFetchData.js'

export default (location, routes, done) => {
  var match = matchRoutes(routes, location.pathname)
  if (match === false || match == null || match == undefined || typeof match !== 'object') {
    return done(new Error('No match!'))
  }
  var components = getComponentsFromRoute(match.route)

  var fetchData = {
    components: match.route.html5,
    params: match.params
  }

  async.parallel({
    fetch: function(callback) {
      fetch(fetchData, callback)
    },
    components: function(callback) {
      ensureComponents(components, function(ok) {
        if (ok !== true) {
          return callback(new Error('Failed to ensure all components!'))
        }
        callback(null, true)
      })
    }
  }, function(err, results) {
    var data = {}
    if (err == null) {
      data = combineFetchData(fetchData.components, results.fetch)
    }

    done(err, data)
  });
}
