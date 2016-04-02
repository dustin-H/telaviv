
import { setCache, getCache } from '../../utils/renderCache.js'
import { get } from '../store/store.js'

const IS_SERVER = true
const IS_CLIENT = false
export { IS_SERVER };
export { IS_CLIENT };

export function setTitle(title) {
  var cache = getCache()
  cache.title = title
  setCache(cache)
}

export function addToHead(html) {
  var cache = getCache()
  cache.head = cache.head || ''
  cache.head += html
  setCache(cache)
}

export function changeLocation(to, code) {
  var cache = getCache()
  cache.redirect = to
  cache.redirectCode = code
  setCache(cache)
}

export function isActive(href) {
  let store = get()
  let state = store.getState()
  let pathname = state.content.location.pathname
  if (href === pathname) {
    return true
  }
  return false
}
