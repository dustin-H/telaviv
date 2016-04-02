
import { get } from '../store/store.js'
import { pushLocation, reload } from '../actions/content.js'

export const IS_SERVER = false
export const IS_CLIENT = true

export function setTitle(title) {
  document.title = title
}

export function addToHead(html) {
  console.warn('`bauhaus.addToHead()` only works on the server-side!')
}

export function changeLocation(to, code) {
  if (to.substr(0, 7) === 'http://' || to.substr(0, 8) === 'https://') {
    window.location.href = to
  } else {
    let store = get()
    pushLocation(to)
  }
}

export function reload() {
  let store = get()
  let state = store.getState()
  pushLocation(state.content.location)
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
