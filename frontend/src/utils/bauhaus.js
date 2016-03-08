import isOnServer from './isServer.js'
import { setCache, getCache } from './renderCache.js'
import { get } from '../app/store/store.js'
import { pushLocation, reload } from '../app/actions/content.js'

export function isServer() {
  return isOnServer
}

export function setTitle(title) {
  if (isServer() === true) {
    var cache = getCache()
    cache.title = title
    setCache(cache)
  } else {
    document.title = title
  }
}

export function addToHead(html) {
  if (isServer() === true) {
    var cache = getCache()
    cache.head = cache.head || ''
    cache.head += html
    setCache(cache)
  } else {
    console.warn('`bauhaus.addToHead()` only works on the server-side!')
  }
}

export function changeLocation(pathname, code) {
  if (isServer() === true) {
    var cache = getCache()
    cache.redirect = pathname
    cache.redirectCode = code
    setCache(cache)
  } else {
    if (pathname.substr(0, 7) === 'http://' || pathname.substr(0, 8) === 'https://') {
      window.location.href = pathname
    } else {
      let store = get()
      store.dispatch(pushLocation(location))
    }
  }
}
