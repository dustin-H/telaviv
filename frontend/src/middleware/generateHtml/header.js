
export default (config) => {
  return (req, res, next, data) => {
    if (req.bauhaus.clientRendering === true && data.state != null && data.content != null) {
      data.head += '<script>var __GLOBAL__={INITIAL_STATE: ' + JSON.stringify(data.state) + '}</script>\n'
      data.head += '<script src="/.static/bundle.js" charset="utf-8" async="true"></script>\n'
    }
    if (data.styles != null) {
      data.head += '<style id="_look" amp-custom>' + data.styles + '</style>\n'
    }
    if (req.bauhaus.canonical != null) {
      data.links += '<link rel="canonical" href="' + req.bauhaus.canonical + '" />\n'
    }
    if (req.bauhaus.amphtml != null) {
      data.links += '<link rel="amphtml" href="' + req.bauhaus.amphtml + '" />\n'
    }
  }
}
