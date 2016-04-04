
import prepareRouteFetch from '../../src/middleware/prepareRouteFetch.js'

describe('Using the prepareRouteFetch middleware', () => {
  it('should return a function', () => {
    let mid = prepareRouteFetch()
    expect(mid).to.be.a('function')
  })
  it('should set the correct fetch data when a route is available', () => {
    let mid = prepareRouteFetch()

    var req = TestUtils.mockRequestForPrepareRouteFetch('html5', 'componentsValue', 'paramsValue')
    const next = sinon.spy()

    mid(req, null, next)

    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)

    expect(req.telaviv.fetch.components).to.equal('componentsValue')
    expect(req.telaviv.fetch.params).to.equal('paramsValue')
  })
  it('should call next with 404 when route is not available', () => {
    let mid = prepareRouteFetch()

    var req = {telaviv: {}}
    const next = sinon.spy()

    mid(req, null, next)

    expect(next).to.have.been.calledOnce
    expect(next).to.have.been.calledWith(404)

    expect(req.telaviv.fetch).to.be.undefined
  })
})
