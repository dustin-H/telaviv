
export default (config) => {
  return (req, res, next, data) => {
    if (req.telaviv.clientRendering === true && data.state != null && data.content != null) {
      data.head += '<script>var __GLOBAL__={INITIAL_STATE: ' + JSON.stringify(data.state) + '}</script>\n'
      data.head += '<script src="/.static/bundle.js" charset="utf-8" async="true"></script>\n'
    }
    if (data.styles != null) {
      data.head += '<style id="_look" amp-custom>' + data.styles + '</style>\n'
    }
    if (req.telaviv.canonical != null) {
      data.links += '<link rel="canonical" href="' + req.telaviv.canonical + '" />\n'
    }
    if (req.telaviv.amphtml != null) {
      data.links += '<link rel="amphtml" href="' + req.telaviv.amphtml + '" />\n'
    }
  }
}
