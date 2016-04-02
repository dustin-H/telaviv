
import errorHandler from '../../../src/middleware/generateHtml/errorHandler.js'

import _ from 'lodash'
import fs from 'fs'
var error = _.template(fs.readFileSync(require.resolve('../../../templates/error.html')))

describe('The generateHtml.errorHandler middleware', () => {
  it('should return a function', () => {
    let mid = errorHandler()
    expect(mid).to.be.a('function')
  })
  it('should not modify anything if the content is available', () => {
    let mid = errorHandler({})

    let req = {bauhaus: {}}
    let res = {statusCode: 200}
    const next = sinon.spy()
    let data = {title: 'MyTitle', content: 'MyContent'}

    mid(req, res, next, data)

    expect(data.title).to.be.an('string')
    expect(data.title).to.equal('MyTitle')
    expect(data.content).to.be.an('string')
    expect(data.content).to.equal('MyContent')
    expect(next).to.have.been.calledNever
  })
  it('should render the correct error and write it to content if no content is available', () => {
    let mid = errorHandler({})

    let req = {bauhaus: {}}
    let res = {statusCode: 500}
    const next = sinon.spy()
    let data = {title: 'MyTitle'}

    mid(req, res, next, data)

    expect(data.title).to.be.an('string')
    expect(data.title).to.equal('500: Internal Server Error')
    expect(data.content).to.be.an('string')
    expect(data.content).to.equal(error({
      code: 500,
      message: 'Internal Server Error'
    }))
    expect(next).to.have.been.calledNever
  })
  it('should render the correct error and write it to content if no content is available and the error code is invalid', () => {
    let mid = errorHandler({})

    let req = {bauhaus: {}}
    let res = {statusCode: 888}
    const next = sinon.spy()
    let data = {title: 'MyTitle'}

    mid(req, res, next, data)

    expect(data.title).to.be.an('string')
    expect(data.title).to.equal('888: Unknown Status Code!')
    expect(data.content).to.be.an('string')
    expect(data.content).to.equal(error({
      code: 888,
      message: 'Unknown Status Code!'
    }))
    expect(next).to.have.been.calledNever
  })
})
