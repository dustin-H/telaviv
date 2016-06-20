
import { server, setConfig, clearModuleCache } from '../src/index.js'
import { resolve } from 'path'

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
  it('should be possible to clear the module cache', () => {
    let config = TestUtils.mockClearModuleCacheConfig()
    server(config)
    require(resolve(config.buildPath, 'server', config.theme, 'Data'))
    require(resolve(config.buildPath, 'server', config.theme, 'Header'))
    let num = clearModuleCache()
    expect(num).to.be.a('number')
    expect(num).to.equal(2)
    num = clearModuleCache()
    expect(num).to.be.a('number')
    expect(num).to.equal(0)
  })
})
