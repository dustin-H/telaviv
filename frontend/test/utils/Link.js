
import Link from '../../src/utils/Link.js'

describe('The Link component handleClick method', () => {
  it('should call pushLocation', () => {
    let event = {button: 0, preventDefault: sinon.spy()}

    let link = new Link()
    Object.assign(link, {
      props: {
        to: '/some/link'
      },
      context: {
        bauhaus: {
          changeLocation: sinon.spy()
        }
      }
    })
    link.handleClick(event)
    expect(event.preventDefault).to.be.calledOnce
    expect(link.context.bauhaus.changeLocation).to.be.calledOnce
    expect(link.context.bauhaus.changeLocation).to.be.calledWith('/some/link')
  })
})
