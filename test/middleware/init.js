
import init from '../../src/middleware/init.js'

describe('Using the init middleware', () => {
  it('should return a function', () => {
    let mid = init()
    expect(mid).to.be.a('function')
  })
  it('adds the telaviv object to the request including the correct canonical address', () => {
    let mid = init(TestUtils.mockInitConfig('http://localhost/'))

    var req = {path: '/demo/test'}
    var res = {}
    const next = sinon.spy()

    mid(req, res, next)

    expect(req.telaviv).to.be.an('object')
    expect(req.telaviv.canonical).to.be.a('string')
    expect(req.telaviv.canonical).to.equal('/demo/test')
    expect(next).to.have.been.calledOnce
  })
})
