var isServer = true
if (typeof __GLOBAL__ !== 'undefined') {
  isServer = false
}
export default isServer
