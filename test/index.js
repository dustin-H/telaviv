
import { server, setConfig } from '../src/index.js'

describe('Using the telaviv (index.js) middleware', () => {
  it('should return a function', () => {
    let mid = server({buildPath: 'build'})
    expect(mid).to.be.a('function')
  })
  it('should be possible to change the config', () => {
    let mid = server({buildPath: 'build'})
    let newConfig = setConfig({buildPath: 'newbuild'})
    expect(mid).to.be.a('function')
    expect(newConfig.buildPath).to.equal('newbuild')
  })
})
