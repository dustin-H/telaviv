
import _ from 'lodash'
import HttpStatus from 'http-status'
import fs from 'fs'
var error = _.template(fs.readFileSync(require.resolve('../../../templates/error.html')))

export default (config) => {
  return (req, res, next, data) => {
    if (data.content == null) {
      let message = HttpStatus[res.statusCode] || 'Unknown Status Code!'
      data.content = error({
        code: res.statusCode,
        message: message
      })
      data.title = res.statusCode + ': ' + message
    }
  }
}
