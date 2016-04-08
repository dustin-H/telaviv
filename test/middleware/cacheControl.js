
import cacheControl from '../../src/middleware/cacheControl.js'

describe('Using the serviceUnavailable middleware', () => {
  it('should return a function', () => {
    let mid = cacheControl()
    expect(mid).to.be.a('function')
  })
  it('should set the default static cacheControl header if conditions are right', () => {
    let mid = cacheControl({staticCacheControl: 'max-age=42'})

    let res = {statusCode: 200, get: () => null}

    res.set = sinon.spy()

    let req = {
      telaviv: {
        fetch: {
          components: [{
            component: 'Footer'
          }]
        }
      }
    }

    const next = sinon.spy()

    mid(req, res, next)

    expect(res.set).to.have.been.calledOnce
    expect(res.set).to.have.been.calledWith('Cache-Control', 'max-age=42')
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
  })
  it('should NOT set the default static cacheControl header if the statusCode is not 200', () => {
    let mid = cacheControl({staticCacheControl: 'max-age=42'})

    let res = {statusCode: 404, get: () => null}

    res.set = sinon.spy()

    let req = {
      telaviv: {
        fetch: {
          components: [{
            component: 'Footer'
          }]
        }
      }
    }

    const next = sinon.spy()

    mid(req, res, next)

    expect(res.set).to.have.been.calledNever
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
  })
  it('should NOT set the default static cacheControl header if data has been fetched', () => {
    let mid = cacheControl({staticCacheControl: 'max-age=42'})

    let res = {statusCode: 200, get: () => null}

    res.set = sinon.spy()

    let req = {
      telaviv: {
        fetch: {
          components: [{
            component: 'Footer',
            data: {}
          }]
        }
      }
    }

    const next = sinon.spy()

    mid(req, res, next)

    expect(res.set).to.have.been.calledNever
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
  })
})
