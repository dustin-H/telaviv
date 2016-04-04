import store from './store.js'
import * as c from './constants.js'

__GLOBAL__.exportDefault = null
__GLOBAL__.oldExportDefault = null

var triggerCallbacksById = function(id, ok) {
  for (var i in store[id].callbacks) {
    store[id].callbacks[i](ok)
  }
  store[id].callbacks = null
  store[id].callbacks = []
}

var loadComponentIfNecessary = function(id, cb) {
  if (store[id] == null) {
    store[id] = {}
    store[id].url = '/.static/components/' + id + '.js'
    store[id].callbacks = []
    store[id].state = c.INITAL
    store[id].component = null
  }
  if (store[id].state !== c.LOADING && store[id].state !== c.LOADED && store[id].url != null) {
    store[id].state = c.LOADING
    store[id].callbacks.push(cb)

    var errorHandler = function(err) {
      if (err != null) {
        console.error('Failed to load component "' + id + '"!')
      } else {
        console.error('Failed to evaluate component "' + id + '"!')
      }
      store[id].state = c.ERROR
      return triggerCallbacksById(id, false)
    }

    var mod = document.createElement('script');
    mod.src = store[id].url
    mod.type = 'text/javascript'
    mod.async = 'true'
    mod.onload = function() {
      if (__GLOBAL__.exportDefault == null || __GLOBAL__.oldExportDefault === __GLOBAL__.exportDefault) {
        return errorHandler()
      }
      __GLOBAL__.oldExportDefault = __GLOBAL__.exportDefault
      store[id].component = __GLOBAL__.exportDefault
      store[id].state = c.LOADED
      return triggerCallbacksById(id, true)
    }
    mod.onerror = errorHandler
    document.head.appendChild(mod)
  } else {
    if (store[id].state === c.LOADED) {
      // Component is already available!
      return setTimeout(function() {
        cb(true)
      }, 0)
    } else {
      // Component is currently loading => Add callback to callbacks
      store[id].callbacks.push(cb)
    }
  }

}

var loadComponentsIfNecessary = function(ids, cb) {
  var check = true
  var counter = 0
  for (var i in ids) {
    var id = ids[i]
    counter++
    loadComponentIfNecessary(id, function(ok) {
      counter--
      if (ok !== true) {
        console.error('Component', id, 'is missing!');
        check = false
      }
      if (counter < 1) {
        cb(check)
      }
    })
  }
}

export default loadComponentsIfNecessary
