
//import app from '../../src/app.js'
import staticProvider from '../../src/staticProvider/index.js'

describe('The staticProvider middleware', () => {
  it('should return a express app function', () => {
    var mid = staticProvider({theme: 'test'})
    expect(mid).to.be.a('function')
  })
})
