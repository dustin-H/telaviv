
import router from '../../src/middleware/router.js'

describe('Using the router middleware', () => {
  it('should return a function', () => {
    let mid = router()
    expect(mid).to.be.a('function')
  })
  it('should call next with error 404 when no route matches', () => {
    let mid = router(TestUtils.mockRouterConfig('/test/:id', 'Footer'))

    var req = {
      path: '/not/matching',
      telaviv: {}
    }
    const next = sinon.spy()

    mid(req, null, next)

    expect(next).to.have.been.calledOnce
    expect(next).to.have.been.calledWith(404)
    expect(req.telaviv.route).to.be.false
  })
  it('should call next with error 404 when the route matches but is internal', () => {
    let mid = router(TestUtils.mockRouterConfig('/test/:id', 'Footer', true))

    var req = {
      path: '/test/SomeId',
      telaviv: {}
    }
    const next = sinon.spy()

    mid(req, null, next)

    expect(next).to.have.been.calledOnce
    expect(next).to.have.been.calledWith(404)
    expect(req.telaviv.route).to.be.an('object')
  })
  it('should add the correct route object to the req object when it matches', () => {
    var config = TestUtils.mockRouterConfig('/test/:id', 'Footer')
    let mid = router(config)
    expect(mid).to.be.a('function')

    var req = {
      path: '/test/SomeId',
      telaviv: {}
    }
    var res = {
      status: sinon.spy()
    }
    const next = sinon.spy()

    mid(req, res, next)

    expect(res.status).to.have.been.calledNever
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)

    expect(req.telaviv.route).to.be.an('object')
    expect(req.telaviv.route.params).to.be.an('object')
    expect(req.telaviv.route.params.id).to.equal('SomeId')
    expect(req.telaviv.route.route).to.be.an('object')
    expect(req.telaviv.route.route).to.eql(config.routes[0])
  })
})
