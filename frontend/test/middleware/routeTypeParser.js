
import routeTypeParser from '../../src/middleware/routeTypeParser.js'

describe('The routeTypeParser middleware', () => {
  it('should return a function', () => {
    let mid = routeTypeParser()
    expect(mid).to.be.a('function')
  })
  it('should set the statuscode call next with error 404 when no content is available', () => {
    let mid = routeTypeParser()

    var req = TestUtils.mockRequestForRouteTypeParser('http://localhost/some/path', false, false, false, false)
    const next = sinon.spy()

    // crashes when some res method is called
    mid(req, null, next)

    expect(next).to.have.been.calledOnce
    expect(next).to.have.been.calledWith(404)
    expect(req.bauhaus.type).to.be.undefined
    expect(req.bauhaus.amphtml).to.be.undefined
    expect(req.bauhaus.canonical).to.equal('http://localhost/some/path')
  })
  it('should set req type to redirect if route includes redirect and call next', () => {
    let mid = routeTypeParser()

    var req = TestUtils.mockRequestForRouteTypeParser('http://localhost/some/path', false, false, true, false)
    const next = sinon.spy()

    // crashes when some res method is called
    mid(req, null, next)

    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
    expect(req.bauhaus.type).to.equal('redirect')
    expect(req.bauhaus.amphtml).to.be.undefined
    expect(req.bauhaus.canonical).to.equal('http://localhost/some/path')
  })
  it('should set req type to redirect if route includes redirect, even if the route includes other content', () => {
    let mid = routeTypeParser()

    var req = TestUtils.mockRequestForRouteTypeParser('http://localhost/some/path', true, true, true, true)
    const next = sinon.spy()

    // crashes when some res method is called
    mid(req, null, next)

    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
    expect(req.bauhaus.type).to.equal('redirect')
    expect(req.bauhaus.amphtml).to.be.undefined
    expect(req.bauhaus.canonical).to.equal('http://localhost/some/path')
  })
  it('should set req type to html5 if route includes html5 content but does not include amphtml and the amp flag is NOT set', () => {
    let mid = routeTypeParser()

    var req = TestUtils.mockRequestForRouteTypeParser('http://localhost/some/path', true, false, false, false)
    const next = sinon.spy()

    // crashes when some res method is called
    mid(req, null, next)

    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
    expect(req.bauhaus.type).to.equal('html5')
    expect(req.bauhaus.amphtml).to.be.undefined
    expect(req.bauhaus.canonical).to.equal('http://localhost/some/path')
  })
  it('should set req type to html5 if route includes html5 content but does not include amphtml and the amp flag IS set', () => {
    let mid = routeTypeParser()

    var req = TestUtils.mockRequestForRouteTypeParser('http://localhost/some/path', true, false, false, true)
    const next = sinon.spy()

    // crashes when some res method is called
    mid(req, null, next)

    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
    expect(req.bauhaus.type).to.equal('html5')
    expect(req.bauhaus.amphtml).to.be.undefined
    expect(req.bauhaus.canonical).to.equal('http://localhost/some/path')
  })
  it('should set req type to amphtml if route includes amphtml content but does not include html5 and the amp flag is NOT set', () => {
    let mid = routeTypeParser()

    var req = TestUtils.mockRequestForRouteTypeParser('http://localhost/some/path', false, true, false, false)
    const next = sinon.spy()

    // crashes when some res method is called
    mid(req, null, next)

    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
    expect(req.bauhaus.type).to.equal('amphtml')
    expect(req.bauhaus.amphtml).to.be.undefined
    expect(req.bauhaus.canonical).to.equal('http://localhost/some/path')
  })
  it('should set req type to amphtml if route includes amphtml content but does not include html5 and the amp flag IS set', () => {
    let mid = routeTypeParser()

    var req = TestUtils.mockRequestForRouteTypeParser('http://localhost/some/path', false, true, false, true)
    const next = sinon.spy()

    // crashes when some res method is called
    mid(req, null, next)

    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
    expect(req.bauhaus.type).to.equal('amphtml')
    expect(req.bauhaus.amphtml).to.be.undefined
    expect(req.bauhaus.canonical).to.equal('http://localhost/some/path')
  })
  it('should set req type to amphtml if route includes amphtml AND html5 content and the amp flag IS set', () => {
    let mid = routeTypeParser()

    var req = TestUtils.mockRequestForRouteTypeParser('http://localhost/some/path', true, true, false, true)
    const next = sinon.spy()

    // crashes when some res method is called
    mid(req, null, next)

    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
    expect(req.bauhaus.type).to.equal('amphtml')
    expect(req.bauhaus.amphtml).to.be.undefined
    expect(req.bauhaus.canonical).to.equal('http://localhost/some/path')
  })
  it('should set req type to html5 and set amphtml link and unset canonical link if route includes amphtml AND html5 content and the amp flag is NOT set', () => {
    let mid = routeTypeParser()

    var req = TestUtils.mockRequestForRouteTypeParser('http://localhost/some/path', true, true, false, false)
    const next = sinon.spy()

    // crashes when some res method is called
    mid(req, null, next)

    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
    expect(req.bauhaus.type).to.equal('html5')
    expect(req.bauhaus.canonical).to.be.null
    expect(req.bauhaus.amphtml).to.equal('http://localhost/some/path?amp=1')
  })
})
