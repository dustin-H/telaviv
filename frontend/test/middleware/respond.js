
import respond from '../../src/middleware/respond.js'

describe('Using the respond middleware', () => {
  it('should return a function', () => {
    let mid = respond()
    expect(mid).to.be.a('function')
  })
  it('should return a function that calls res.send with the correct content', () => {
    let mid = respond()

    var req = {bauhaus: {html: '<div>MyDiv</div>'}}
    var res = {send: sinon.spy()}
    const next = sinon.spy()

    mid(req, res, next)

    expect(res.send).to.have.been.calledOnce
    expect(res.send).to.have.been.calledWith(req.bauhaus.html)
    expect(next).to.have.been.calledNever
  })
})
