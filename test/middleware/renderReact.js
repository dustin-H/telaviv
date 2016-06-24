
import renderReact from '../../src/middleware/renderReact.js'

describe('Using the renderReact middleware', () => {
  it('should return a function', () => {
    let mid = renderReact()
    expect(mid).to.be.a('function')
  })
  it('should reject with code 500 when fetch or data is null', () => {
    let mid = renderReact({})

    let req = {
      telaviv: {
        fetch: {}
      }
    }
    let res = {}
    const next = sinon.spy()
    mid(req, res, next)

    expect(next).to.have.been.calledOnce
    expect(next).to.have.been.calledWith(500)
  })
  it('should render a data component including the correct data for client rendering', () => {
    let mid = renderReact(TestUtils.mockRenderReactConfig())

    let req = {
      telaviv: {
        clientRendering: true,
        fetch: {
          data: [{
            component: 'Data',
            data: {
              some: 'data'
            }
          }]
        }
      },
      path: '/some/path'
    }
    let res = {redirect: sinon.spy()}
    const next = sinon.spy()
    mid(req, res, next)

    expect(res.redirect).to.have.been.calledNever
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
    expect(req.telaviv.renderData.content).to.equal('<div data-reactroot="" data-reactid="1" data-react-checksum="213198241"><div data-reactid="2">{&quot;some&quot;:&quot;data&quot;}</div></div>')
  })
  it('should render a data component including the correct data as static markup', () => {
    let mid = renderReact(TestUtils.mockRenderReactConfig())

    let req = {
      telaviv: {
        fetch: {
          data: [{
            component: 'Data',
            data: {
              some: 'data'
            }
          }]
        }
      },
      path: '/some/path'
    }
    let res = {redirect: sinon.spy()}
    const next = sinon.spy()
    mid(req, res, next)

    expect(res.redirect).to.have.been.calledNever
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
    expect(req.telaviv.renderData.content).to.equal('<div><div>{&quot;some&quot;:&quot;data&quot;}</div></div>')
  })
  it('should render a active component including the correct data when the path is matching', () => {
    let mid = renderReact(TestUtils.mockRenderReactConfig())

    let req = {
      telaviv: {
        fetch: {
          data: [{
            component: 'Active',
            data: {}
          }]
        }
      },
      path: '/is/active'
    }
    let res = {redirect: sinon.spy()}
    const next = sinon.spy()
    mid(req, res, next)

    expect(res.redirect).to.have.been.calledNever
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
    expect(req.telaviv.renderData.content).to.equal('<div><div>true</div></div>')
  })
  it('should render a active component including the correct data when the path is NOT matching', () => {
    let mid = renderReact(TestUtils.mockRenderReactConfig())

    let req = {
      telaviv: {
        fetch: {
          data: [{
            component: 'Active',
            data: {}
          }]
        }
      },
      path: '/is/not/active'
    }
    let res = {redirect: sinon.spy()}
    const next = sinon.spy()
    mid(req, res, next)

    expect(res.redirect).to.have.been.calledNever
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
    expect(req.telaviv.renderData.content).to.equal('<div><div>false</div></div>')
  })
  it('should render multiple style components in the correct order #1', () => {
    let mid = renderReact(TestUtils.mockRenderReactConfig())

    let req = {
      telaviv: {
        fetch: {
          data: [{
            component: 'StylesRed',
            data: {}
          }, {
            component: 'StylesBlue',
            data: {}
          }]
        }
      },
      path: '/some/path'
    }
    let res = {redirect: sinon.spy()}
    const next = sinon.spy()
    mid(req, res, next)

    expect(res.redirect).to.have.been.calledNever
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
    expect(req.telaviv.renderData.content).to.equal('<div><div class="c0"></div><div class="c1"></div></div>')
    expect(req.telaviv.renderData.styles).to.equal('.c0{color:red}.c1{color:blue}')
  })
  it('should render multiple style components in the correct order #2', () => {
    let mid = renderReact(TestUtils.mockRenderReactConfig())

    let req = {
      telaviv: {
        fetch: {
          data: [{
            component: 'StylesBlue',
            data: {}
          }, {
            component: 'StylesRed',
            data: {}
          }]
        }
      },
      path: '/some/path'
    }
    let res = {redirect: sinon.spy()}
    const next = sinon.spy()
    mid(req, res, next)

    expect(res.redirect).to.have.been.calledNever
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
    expect(req.telaviv.renderData.content).to.equal('<div><div class="c0"></div><div class="c1"></div></div>')
    expect(req.telaviv.renderData.styles).to.equal('.c0{color:blue}.c1{color:red}')
  })
  it('should redirect correctly without a code', () => {
    let mid = renderReact(TestUtils.mockRenderReactConfig())

    let req = {
      telaviv: {
        fetch: {
          data: [{
            component: 'Redirect',
            data: {}
          }]
        }
      },
      path: '/some/path'
    }
    let res = {redirect: sinon.spy()}
    const next = sinon.spy()
    mid(req, res, next)

    expect(res.redirect).to.have.been.calledOnce
    expect(res.redirect).to.have.been.calledWith('/redirect/to')
    expect(next).to.have.been.calledNever
  })
  it('should redirect correctly with a code', () => {
    let mid = renderReact(TestUtils.mockRenderReactConfig())

    let req = {
      telaviv: {
        fetch: {
          data: [{
            component: 'RedirectWithCode',
            data: {}
          }]
        }
      },
      path: '/some/path'
    }
    let res = {redirect: sinon.spy()}
    const next = sinon.spy()
    mid(req, res, next)

    expect(res.redirect).to.have.been.calledOnce
    expect(res.redirect).to.have.been.calledWith(301, '/redirect/to')
    expect(next).to.have.been.calledNever
  })
  it('should set the title correctly', () => {
    let mid = renderReact(TestUtils.mockRenderReactConfig())

    let req = {
      telaviv: {
        fetch: {
          data: [{
            component: 'Title',
            data: {}
          }]
        }
      },
      path: '/some/path'
    }
    let res = {redirect: sinon.spy()}
    const next = sinon.spy()
    mid(req, res, next)

    expect(res.redirect).to.have.been.calledNever
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
    expect(req.telaviv.renderData.title).to.equal('SpecialTitle')
  })
  it('should add something to the head correctly', () => {
    let mid = renderReact(TestUtils.mockRenderReactConfig())

    let req = {
      telaviv: {
        fetch: {
          data: [{
            component: 'Header',
            data: {}
          }]
        }
      },
      path: '/some/path'
    }
    let res = {redirect: sinon.spy()}
    const next = sinon.spy()
    mid(req, res, next)

    expect(res.redirect).to.have.been.calledNever
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
    expect(req.telaviv.renderData.head).to.equal('<script>var SpecialScript = 42;</script>')
  })
  it('should render the link component correctly', () => {
    let mid = renderReact(TestUtils.mockRenderReactConfig())

    let req = {
      telaviv: {
        fetch: {
          data: [{
            component: 'Link',
            data: {}
          }]
        }
      },
      path: '/link/to'
    }
    let res = {redirect: sinon.spy()}
    const next = sinon.spy()
    mid(req, res, next)

    expect(res.redirect).to.have.been.calledNever
    expect(next).to.have.been.calledOnce
    expect(next.args[0].length).to.equal(0)
    expect(req.telaviv.renderData.content).to.equal('<div><div><a class="" href="/link/to">Link1</a><a class="" href="/not/link/to">Link2</a><a class="link link-active" href="/link/to">Link3</a><a class="link" href="/not/link/to">Link4</a><a style="color:blue;" class="" href="/link/to">Link5</a><a style="color:red;" class="" href="/not/link/to">Link6</a><a class="" href="/link/to">Link7</a><a class="" href="/not/link/to">Link8</a><a class="link-active" href="/link/to">Link9</a><a class="" href="/not/link/to">Link10</a></div></div>')
  })
})
