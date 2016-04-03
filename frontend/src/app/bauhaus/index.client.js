
import { get } from '../store/store.js'
import { pushLocation, reload } from '../actions/content.js'
import Link from '../../utils/Link.js'

const IS_SERVER = false
const IS_CLIENT = true
export { IS_SERVER };
export { IS_CLIENT };
export { reload };
export { Link };

export function setTitle(title) {
  document.title = title
}

export function changeLocation(to, code) {
  if (to.substr(0, 7) === 'http://' || to.substr(0, 8) === 'https://') {
    window.location.href = to
  } else {
    let store = get()
    pushLocation(to)
  }
}

export function isLoading() {
  let store = get()
  let state = store.getState()
  return state.content.loading || false
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
