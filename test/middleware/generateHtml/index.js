
import index from '../../../src/middleware/generateHtml/index.js'

import _ from 'lodash'
import fs from 'fs'
var html5 = _.template(fs.readFileSync(require.resolve('../../../templates/html5.html')))
var amphtml = _.template(fs.readFileSync(require.resolve('../../../templates/amphtml.html')))

describe('The generateHtml.index middleware', () => {
  it('should return a function', () => {
    let mid = index()
    expect(mid).to.be.a('function')
  })
  it('should render the correct html5', () => {
    let mid = index({})

    let req = {
      telaviv: {
        renderData: {
          content: 'MyContent'
        },
        type: 'html5'
      }
    }
    let res = {statusCode: 200}
    const next = sinon.spy()

    mid(req, res, next)

    expect(req.telaviv.html).to.be.an('string')

    let data = {
      title: 'No Title!',
      content: 'MyContent',
      head: '',
      links: ''
    }

    expect(req.telaviv.html).to.equal(html5(data))
    expect(next).to.have.been.calledNever
  })
  it('should render the correct amphtml', () => {
    let mid = index({})

    let req = {
      telaviv: {
        renderData: {
          content: 'MyContent'
        },
        type: 'amphtml'
      }
    }
    let res = {statusCode: 200}
    const next = sinon.spy()

    mid(req, res, next)

    expect(req.telaviv.html).to.be.an('string')

    let data = {
      title: 'No Title!',
      content: 'MyContent',
      head: '',
      links: ''
    }

    expect(req.telaviv.html).to.equal(amphtml(data))
    expect(next).to.have.been.calledNever
  })
})
