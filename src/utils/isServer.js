var isServer = true
/* istanbul ignore if */
if (typeof __GLOBAL__ !== 'undefined') {
  isServer = false
}
export default isServer
