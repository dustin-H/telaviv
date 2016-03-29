
import redirect from '../../src/middleware/redirect.js'

describe('The redirect middleware', () => {
  it('should return a function', () => {
    let mid = redirect()
    expect(mid).to.be.a('function')
  })
  it('should go to next if req type is not redirect', () => {
    let mid = redirect()

    var redUrl = 'http://www.google.com'
    var req = TestUtils.mockRequestForRedirect('html5', redUrl)
    var res = {redirect: sinon.spy()}
    const next = sinon.spy()

    mid(req, res, next)

    expect(res.redirect).to.have.been.calledNever
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
  })
  it('should redirect without code if req type is redirect and no code is set', () => {
    let mid = redirect()

    var redUrl = 'http://www.google.com'
    var req = TestUtils.mockRequestForRedirect('redirect', redUrl)
    var res = {redirect: sinon.spy()}
    const next = sinon.spy()

    mid(req, res, next)

    expect(res.redirect).to.have.been.calledWith(redUrl)
    expect(next).to.have.been.calledNever
  })
  it('should redirect without code if req type is redirect and no code is set', () => {
    let mid = redirect()

    var redUrl = 'http://www.google.com'
    var req = TestUtils.mockRequestForRedirect('redirect', redUrl, 304)
    var res = {redirect: sinon.spy()}
    const next = sinon.spy()

    mid(req, res, next)

    expect(res.redirect).to.have.been.calledWith(304, redUrl)
    expect(next).to.have.been.calledNever
  })
})
