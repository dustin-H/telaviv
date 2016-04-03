
import errorHandler from '../../src/middleware/errorHandler.js'

describe('Using the errorHandler middleware', () => {
  it('should return a function', () => {
    let mid = errorHandler()
    expect(mid).to.be.a('function')
  })
  it('should pipe a error correctly', () => {
    let mid = errorHandler((req, res, next, error) => {
      next()
    })
    let next = sinon.spy()
    mid('TheError', 'TheRequest', 'TheResponse', next)
    expect(next).to.been.calledOnce
    expect(next).to.been.calledWith('TheError')
  })
  it('should pipe a modified error correctly', () => {
    let mid = errorHandler((req, res, next, error) => {
      next('OtherError')
    })
    let next = sinon.spy()
    mid('TheError', 'TheRequest', 'TheResponse', next)
    expect(next).to.been.calledOnce
    expect(next).to.been.calledWith('OtherError')
  })
})
