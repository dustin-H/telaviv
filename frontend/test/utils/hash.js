
//import app from '../../src/app.js'
import { generateStringHash } from '../../src/utils/hash.js'

describe('The hash generator (generateStringHash)', () => {
  it('should create a hash from a test string', () => {
    let out = generateStringHash('SomeString')
    expect(out).to.be.a('string')
    expect(out).to.equal('c1pnwl')
  })
  it('should create a hash from an empty string', () => {
    let out = generateStringHash('')
    expect(out).to.be.a('string')
    expect(out).to.equal('0')
  })
})
