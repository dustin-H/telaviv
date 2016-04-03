
import clientRendering from '../../src/middleware/clientRendering.js'

describe('Using the clientRendering middleware', () => {
  it('should return a function', () => {
    let mid = clientRendering()
    expect(mid).to.be.a('function')
  })
  it('should set clientRendering to true if render type is html5', () => {
    let mid = clientRendering({})

    var req = {bauhaus: {type: 'html5'}}
    var res = {}
    const next = sinon.spy()

    mid(req, res, next)

    expect(req.bauhaus.clientRendering).to.be.true
    expect(next).to.have.been.calledOnce
  })
  it('should set clientRendering to false if render type is NOT html5', () => {
    let mid = clientRendering({})

    var req = {bauhaus: {type: 'amphtml'}}
    var res = {}
    const next = sinon.spy()

    mid(req, res, next)

    expect(req.bauhaus.clientRendering).to.be.false
    expect(next).to.have.been.calledOnce
  })
})
