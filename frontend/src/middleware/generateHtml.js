
var _ = require('lodash')
var fs = require('fs')
var amphtml = _.template(fs.readFileSync(require.resolve('../../templates/amp.html')))
var html5 = _.template(fs.readFileSync(require.resolve('../../templates/html5.html')))
var error = _.template(fs.readFileSync(require.resolve('../../templates/error.html')))
var HttpStatus = require('http-status-codes')

export default function(config) {
  return (req, res, next) => {
    let type = req.bauhaus.type
    let data = req.bauhaus.renderData

    if (data.head == null) {
      data.head = ''
    }

    if (data.errorCode != null || data.content == null) {
      var code = parseInt(data.errorCode, 10) || 204
      var message = ''
      try {
        message = HttpStatus.getStatusText(code)
      } catch ( e ) {
        message = 'Unknown status-code!'
      }
      data.content = error({code: code, message: message})
      data.title = 'ERROR ' + code
    } else {
      if (data.state != null && type !== 'amphtml') {
        data.head += '<script>__GLOBAL_INITIAL_REDUX_STATE__=' + JSON.stringify(data.state) + '</script>\n'
      }
      if (type !== 'amphtml') {
        data.head += '<script>__GLOBAL__={}</script>\n'
        data.head += '<script src="/.static/bundle.js" charset="utf-8" async="true"></script>\n'
      }

    }
    if (data.styles != null) {
      data.head += '<style id="_look" amp-custom>' + data.styles + '</style>\n'
    }

    var d = generate(Object.assign({}, data, {
      canonical: req.bauhaus.canonical,
      amphtml: req.bauhaus.amphtml
    }))

    if (type === 'amphtml') {
      req.bauhaus.html = amphtml(d);
      return next()
    }
    req.bauhaus.html = html5(d);
    return next()
  }
}

var generate = function(data) {
  var d = {
    head: '',
    title: config.title || 'No title!',
    content: data.content || '204: No content!',
    links: ''
  }

  if (data.canonical != null) {
    d.links += `<link rel="canonical" href="${data.canonical}" />`
  }
  if (data.amphtml != null) {
    d.links += `<link rel="amphtml" href="${data.amphtml}" />`
  }
  if (data.head != null) {
    d.head += data.head
  }
  if (data.title != null) {
    d.title = data.title
  }
  return d
}
