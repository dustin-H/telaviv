
var _ = require('lodash')
var fs = require('fs')
var amp = _.template(fs.readFileSync(require.resolve('../../templates/amp.html')))
var html5 = _.template(fs.readFileSync(require.resolve('../../templates/html5.html')))
var error = _.template(fs.readFileSync(require.resolve('../../templates/error.html')))
var config = require('../config');
var HttpStatus = require('http-status-codes')

module.exports = function(req, res, next) {
  res.bauhaus = res.bauhaus || {}
  res.bauhaus.renderHTML = function(type, data) {

    if(data.head == null){
      data.head = ''
    }

    if(data.errorCode != null || data.content == null){
      var code = parseInt(data.errorCode) || 204
      var message = ''
      try {
        message = HttpStatus.getStatusText(code)
      } catch(e){
        message = 'Unknown status-code!'
      }
      data.content = error({code: code, message: message})
      data.title = 'ERROR '+code
    }
    if(data.state != null && type !== 'amphtml'){
      data.head += '<script>__GLOBAL_INITIAL_REDUX_STATE__='+JSON.stringify(data.state)+'</script>\n'
    }
    if(data.styles != null){
      data.head += '<style amp-custom>'+data.styles+'</style>\n'
    }

    var d = generate(Object.assign({}, data, {
      canonical: req.bauhaus.canonical,
      amphtml: req.bauhaus.amphtml
    }))

    var diff = process.hrtime(req.bauhaus.time);
    console.log('GET:', req.path, 'in', diff[1]/1000000, 'Milliseconds!')

    if(type === 'amphtml'){
      return res.send(amp(d))
    }
    res.send(html5(d))
  }
  next();
}

var generate = function(data) {
  var d = {
    head: '',
    title: config.title || 'No content!',
    content: '204: No content!',
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
  if (data.content != null) {
    d.content = data.content
  } else {
    res.status(204)
  }
  if (data.title != null) {
    d.title = data.title
  }
  return d
}
