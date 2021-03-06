
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
        telaviv: {
          changeLocation: sinon.spy()
        }
      }
    })
    link.handleClick(event)
    expect(event.preventDefault).to.be.calledOnce
    expect(link.context.telaviv.changeLocation).to.be.calledOnce
    expect(link.context.telaviv.changeLocation).to.be.calledWith('/some/link')
  })
})
