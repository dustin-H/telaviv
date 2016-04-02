
import renderReact from '../../src/middleware/renderReact.js'

describe('Using the init middleware', () => {
  it('should return a function', () => {
    let mid = renderReact()
    expect(mid).to.be.a('function')
  })
  it('should reject with code 500 when fetch or data is null', () => {
    let mid = renderReact({})

    var req = {
      bauhaus: {
        fetch: {}
      }
    }
    var res = {}
    const next = sinon.spy()

    mid(req, res, next)

    expect(next).to.have.been.calledOnce
    expect(next).to.have.been.calledWith(500)
  })
})
