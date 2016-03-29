
import store from './client/store.js'
import loader from './client/loader.js'
import * as c from './client/constants.js'
import api from './client/api.js'

export function getComponent(id) {
  if (store[id] != null && store[id].component != null && store[id].state === c.LOADED) {
    return store[id].component
  } else {
    return null
  }
}

export function ensureComponents(ids, cb) {
  return loader(ids, cb)
}

export function registerComponent(id, component) {
  store[id] = {component: component, state: c.LOADED}
}
