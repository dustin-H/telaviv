
import prepareErrorFetch from '../../src/middleware/prepareErrorFetch.js'

describe('The prepareErrorFetch middleware', () => {
  it('should return a function', () => {
    let mid = prepareErrorFetch()
    expect(mid).to.be.a('function')
  })
  it('should set the status code from the error', () => {
    let mid = prepareErrorFetch({routes: [], errors: []})

    var req = TestUtils.mockRequestForPrepareErrorFetch('html5')
    var res = TestUtils.mockResponseForPrepareErrorFetch(200)
    const next = sinon.spy()

    mid(req, res, next, 432)

    expect(res.statusCode).to.equal(432)
    expect(req.bauhaus.fetch).to.be.null
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
  })
  it('should set the status code to 500 if it is 200', () => {
    let mid = prepareErrorFetch({routes: [], errors: []})

    var req = TestUtils.mockRequestForPrepareErrorFetch('html5')
    var res = TestUtils.mockResponseForPrepareErrorFetch(200)
    const next = sinon.spy()

    mid(req, res, next, 'Some Error')

    expect(res.statusCode).to.equal(500)
    expect(req.bauhaus.fetch).to.be.null
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
  })
  it('should ignore error code if it is to big', () => {
    let mid = prepareErrorFetch({routes: [], errors: []})

    var req = TestUtils.mockRequestForPrepareErrorFetch('html5')
    var res = TestUtils.mockResponseForPrepareErrorFetch(200)
    const next = sinon.spy()

    mid(req, res, next, 600)

    expect(res.statusCode).to.equal(500)
    expect(req.bauhaus.fetch).to.be.null
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
  })
  it('should ignore error code if it is to small', () => {
    let mid = prepareErrorFetch({routes: [], errors: []})

    var req = TestUtils.mockRequestForPrepareErrorFetch('html5')
    var res = TestUtils.mockResponseForPrepareErrorFetch(200)
    const next = sinon.spy()

    mid(req, res, next, 399)

    expect(res.statusCode).to.equal(500)
    expect(req.bauhaus.fetch).to.be.null
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
  })
  it('should match the correct error route if correct type is available', () => {
    let mid = prepareErrorFetch(TestUtils.mockConfigForPrepareErrorFetch('SomeComponent'))

    var req = TestUtils.mockRequestForPrepareErrorFetch('html5')
    var res = TestUtils.mockResponseForPrepareErrorFetch(200)
    const next = sinon.spy()

    mid(req, res, next, 404)

    expect(res.statusCode).to.equal(404)
    expect(req.bauhaus.fetch).to.be.an('object')
    expect(req.bauhaus.fetch.params.code).to.equal('404')
    expect(req.bauhaus.fetch.components[0].component).to.equal('SomeComponent')
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
  })
  it('should create no fetch data if correct error route type is not available', () => {
    let mid = prepareErrorFetch(TestUtils.mockConfigForPrepareErrorFetch('SomeComponent'))

    var req = TestUtils.mockRequestForPrepareErrorFetch('amphtml')
    var res = TestUtils.mockResponseForPrepareErrorFetch(200)
    const next = sinon.spy()

    mid(req, res, next, 404)

    expect(res.statusCode).to.equal(404)
    expect(req.bauhaus.fetch).to.be.null
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
  })
})
