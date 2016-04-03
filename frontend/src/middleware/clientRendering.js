
export default function() {
  return (req, res, next) => {
    req.bauhaus.clientRendering = false
    if (req.bauhaus.type === 'html5') {
      req.bauhaus.clientRendering = true
    }
    next()
  }
}
