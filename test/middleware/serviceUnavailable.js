
import serviceUnavailable from '../../src/middleware/serviceUnavailable.js'

describe('Using the serviceUnavailable middleware', () => {
  it('should return a function', () => {
    let mid = serviceUnavailable()
    expect(mid).to.be.a('function')
  })
  it('should return a function that calls res.send with the correct content', () => {
    let mid = serviceUnavailable()

    var send = sinon.spy()
    var status = sinon.spy()

    var res = {}

    res.send = (data) => {
      send(data)
      return res
    }

    res.status = (data) => {
      status(data)
      return res
    }

    const next = sinon.spy()

    mid(null, res, next, {stack: 'MyTestStackTrace'})

    expect(status).to.have.been.calledOnce
    expect(status).to.have.been.calledWith(503)
    expect(send).to.have.been.calledOnce
    expect(send.args[0][0]).to.be.a('string')
    expect(send.args[0][0].length).to.be.within(10, Infinity)
    expect(next).to.have.been.calledNever
  })
  it('should return a function that calls res.send with the correct content without stack trace', () => {
    let mid = serviceUnavailable()

    var send = sinon.spy()
    var status = sinon.spy()

    var res = {}

    res.send = (data) => {
      send(data)
      return res
    }

    res.status = (data) => {
      status(data)
      return res
    }

    const next = sinon.spy()

    mid(null, res, next, {})

    expect(status).to.have.been.calledOnce
    expect(status).to.have.been.calledWith(503)
    expect(send).to.have.been.calledOnce
    expect(send.args[0][0]).to.be.a('string')
    expect(send.args[0][0].length).to.be.within(10, Infinity)
    expect(next).to.have.been.calledNever
  })
})
