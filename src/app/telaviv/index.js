
import { setCache, getCache } from '../../utils/renderCache.js'
import { get } from '../store/store.js'
import Link from '../../utils/Link.js'
import isActive from './isActive.js'

const IS_SERVER = true
const IS_CLIENT = false
export { IS_SERVER };
export { IS_CLIENT };
export { Link };
export { isActive };

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
