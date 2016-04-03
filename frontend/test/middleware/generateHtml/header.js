
import header from '../../../src/middleware/generateHtml/header.js'

describe('The generateHtml.header middleware', () => {
  it('should return a function', () => {
    let mid = header()
    expect(mid).to.be.a('function')
  })
  it('should not modify data if no correct data is available', () => {
    let mid = header({})

    let req = {bauhaus: {}}
    let res = {statusCode: 200}
    const next = sinon.spy()
    let data = {links: 'MyLinks', head: 'MyHead'}

    mid(req, res, next, data)

    expect(data.head).to.be.an('string')
    expect(data.head).to.equal('MyHead')
    expect(data.links).to.be.an('string')
    expect(data.links).to.equal('MyLinks')
    expect(next).to.have.been.calledNever
  })
  it('should add global script and bundle src script to head if provided correctly', () => {
    let mid = header({})

    let req = {bauhaus: {type: 'html5', clientRendering: true}}
    let res = {statusCode: 200}
    const next = sinon.spy()
    let data = {
      links: '',
      head: '',
      state: {
        my: 'state'
      },
      content: 'testContent'
    }

    mid(req, res, next, data)

    expect(data.head).to.be.an('string')
    expect(data.head).to.equal('<script>var __GLOBAL__={INITIAL_STATE: {"my":"state"}}</script>\n<script src="/.static/bundle.js" charset="utf-8" async="true"></script>\n')
    expect(data.links).to.be.an('string')
    expect(data.links).to.equal('')
    expect(next).to.have.been.calledNever
  })
  it('should add canonical link to links if provided correctly', () => {
    let mid = header({})

    let req = {bauhaus: {canonical: 'http://localhost/test'}}
    let res = {statusCode: 200}
    const next = sinon.spy()
    let data = {links: '', head: ''}

    mid(req, res, next, data)

    expect(data.head).to.be.an('string')
    expect(data.head).to.equal('')
    expect(data.links).to.be.an('string')
    expect(data.links).to.equal('<link rel="canonical" href="http://localhost/test" />\n')
    expect(next).to.have.been.calledNever
  })
  it('should add amphtml link to links if provided correctly', () => {
    let mid = header({})

    let req = {bauhaus: {amphtml: 'http://localhost/test?amp=1'}}
    let res = {statusCode: 200}
    const next = sinon.spy()
    let data = {links: '', head: ''}

    mid(req, res, next, data)

    expect(data.head).to.be.an('string')
    expect(data.head).to.equal('')
    expect(data.links).to.be.an('string')
    expect(data.links).to.equal('<link rel="amphtml" href="http://localhost/test?amp=1" />\n')
    expect(next).to.have.been.calledNever
  })
  it('should add styles to head if provided correctly', () => {
    let mid = header({})

    let req = {bauhaus: {}}
    let res = {statusCode: 200}
    const next = sinon.spy()
    let data = {
      links: '',
      head: '',
      styles: '.myStyleClass{color: red}'
    }

    mid(req, res, next, data)

    expect(data.head).to.be.an('string')
    expect(data.head).to.equal('<style id="_look" amp-custom>.myStyleClass{color: red}</style>\n')
    expect(data.links).to.be.an('string')
    expect(data.links).to.equal('')
    expect(next).to.have.been.calledNever
  })
})
