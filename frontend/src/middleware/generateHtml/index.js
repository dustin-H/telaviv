import _ from 'lodash'
import fs from 'fs'
var amphtml = _.template(fs.readFileSync(require.resolve('../../../templates/amphtml.html')))
var html5 = _.template(fs.readFileSync(require.resolve('../../../templates/html5.html')))

import getInit from './init.js'
import getHeader from './header.js'
import getErrorHandler from './errorHandler.js'

export default function(config) {
  let init = getInit(config)
  let header = getHeader(config)
  let errorHandler = getErrorHandler(config)

  return (req, res, next) => {
    let data = init(req, res, next)

    header(req, res, next, data)
    errorHandler(req, res, next, data)

    if (req.bauhaus.type === 'amphtml') {
      req.bauhaus.html = amphtml(data);
    } else {
      req.bauhaus.html = html5(data);
    }
    next()
  }
}
