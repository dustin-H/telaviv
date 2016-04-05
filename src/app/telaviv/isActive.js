import { get } from '../store/store.js'

export default (href) => {
  let store = get()
  let state = store.getState()
  let pathname = state.content.location.pathname
  if (href === pathname) {
    return true
  }
  return false
}
