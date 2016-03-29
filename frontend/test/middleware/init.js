
import init from '../../src/middleware/init.js'

describe('Using the init middleware', () => {
  it('should return a function', () => {
    let mid = init()
    expect(mid).to.be.a('function')
  })
  it('adds the bauhaus object to the request including the correct canonical address', () => {
    let mid = init(TestUtils.mockInitConfig('http://localhost/'))

    var req = {path: '/demo/test'}
    var res = {}
    const next = sinon.spy()

    mid(req, res, next)

    expect(req.bauhaus).to.be.an('object')
    expect(req.bauhaus.canonical).to.be.a('string')
    expect(req.bauhaus.canonical).to.equal('http://localhost/demo/test')
    expect(next).to.have.been.calledOnce
  })
})
