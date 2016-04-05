
import { get } from '../store/store.js'
import { pushLocation, reload } from '../actions/content.js'
import Link from '../../utils/Link.js'
import isActive from './isActive.js'

const IS_SERVER = false
const IS_CLIENT = true
export { IS_SERVER };
export { IS_CLIENT };
export { reload };
export { Link };
export { isActive };

export function setTitle(title) {
  document.title = title
}

export function changeLocation(to) {
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
