
export default function() {
  return (req, res, next) => {
    req.telaviv.clientRendering = false
    if (req.telaviv.type === 'html5') {
      req.telaviv.clientRendering = true
    }
    next()
  }
}
