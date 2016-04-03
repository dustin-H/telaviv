
import app from '../src/app.js'

describe('Using the app middleware', () => {
  it('should return a function', () => {
    let mid = app({routes:[]})
    expect(mid).to.be.a('function')
  })
})
