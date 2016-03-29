
import router from '../../src/middleware/router.js'

describe('Using the router middleware', () => {
  it('should return a function', () => {
    let mid = router()
    expect(mid).to.be.a('function')
  })
  it('should set the statuscode to 404 and call next with error 404 when no route matches', () => {
    let mid = router(TestUtils.mockRouterConfig('/test/:id', 'Footer'))

    var req = {path: '/not/matching', bauhaus: {}}
    var res = {status: sinon.spy()}
    const next = sinon.spy()

    mid(req, res, next)

    expect(res.status).to.have.been.calledOnce
    expect(res.status).to.have.been.calledWith(404)
    expect(next).to.have.been.calledOnce
    expect(next).to.have.been.calledWith(404)
    expect(req.bauhaus.route).to.be.false
  })
  it('should add the correct route object to the req object when it matches', () => {
    var config = TestUtils.mockRouterConfig('/test/:id', 'Footer')
    let mid = router(config)
    expect(mid).to.be.a('function')

    var req = {path: '/test/SomeId', bauhaus: {}}
    var res = {status: sinon.spy()}
    const next = sinon.spy()

    mid(req, res, next)

    expect(res.status).to.have.been.calledNever
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)

    expect(req.bauhaus.route).to.be.an('object')
    expect(req.bauhaus.route.params).to.be.an('object')
    expect(req.bauhaus.route.params.id).to.equal('SomeId')
    expect(req.bauhaus.route.route).to.be.an('object')
    expect(req.bauhaus.route.route).to.eql(config.routes[0])
  })
})
