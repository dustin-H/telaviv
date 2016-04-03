
import renderReact from '../../src/middleware/renderReact.js'

describe('Using the init middleware', () => {
  it('should return a function', () => {
    let mid = renderReact()
    expect(mid).to.be.a('function')
  })
  it('should reject with code 500 when fetch or data is null', () => {
    let mid = renderReact({})

    let req = {
      bauhaus: {
        fetch: {}
      }
    }
    let res = {}
    const next = sinon.spy()
    mid(req, res, next)

    expect(next).to.have.been.calledOnce
    expect(next).to.have.been.calledWith(500)
  })
  it('should render a data component including the correct data', () => {
    let mid = renderReact(TestUtils.mockRenderReactConfig())

    let req = {
      bauhaus: {
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
    console.log(JSON.stringify(req.bauhaus.renderData, null, 2));
  })
})
