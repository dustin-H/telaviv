var isServer = true
if (typeof __GLOBAL_INITIAL_REDUX_STATE__ !== 'undefined') {
  isServer = false
}
export default isServer
