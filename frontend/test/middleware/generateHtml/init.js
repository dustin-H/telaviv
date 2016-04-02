
import init from '../../../src/middleware/generateHtml/init.js'

describe('The generateHtml.init middleware', () => {
  it('should return a function', () => {
    let mid = init()
    expect(mid).to.be.a('function')
  })
  it('should create a basic data object when no renderData and no config is available', () => {
    let mid = init({})

    let req = {bauhaus: {}}
    const next = sinon.spy()

    let data = mid(req, null, next)

    expect(data.head).to.be.an('string')
    expect(data.head).to.equal('')
    expect(data.links).to.be.an('string')
    expect(data.links).to.equal('')
    expect(data.title).to.be.an('string')
    expect(data.title).to.equal('No Title!')
    expect(next).to.have.been.calledNever
  })
  it('should create a basic data object when no renderData but config is available', () => {
    let mid = init({title: 'Changed Title'})

    let req = {bauhaus: {}}
    const next = sinon.spy()

    let data = mid(req, null, next)

    expect(data.head).to.be.an('string')
    expect(data.head).to.equal('')
    expect(data.links).to.be.an('string')
    expect(data.links).to.equal('')
    expect(data.title).to.be.an('string')
    expect(data.title).to.equal('Changed Title')
    expect(next).to.have.been.calledNever
  })
  it('should create a basic data object from renderData', () => {
    let mid = init({title: 'Changed Title'})

    let req = {bauhaus: {renderData: {head: 'MyHead', links: 'MyLinks', title: 'MyTitle'}}}
    const next = sinon.spy()

    let data = mid(req, null, next)

    expect(data.head).to.be.an('string')
    expect(data.head).to.equal('MyHead')
    expect(data.links).to.be.an('string')
    expect(data.links).to.equal('MyLinks')
    expect(data.title).to.be.an('string')
    expect(data.title).to.equal('MyTitle')
    expect(next).to.have.been.calledNever
  })
})
