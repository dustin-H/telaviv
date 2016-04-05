
import compileConfig from '../../src/config/compileConfig.js'

describe('The compileConfig function', () => {
  it('should compile an config object correctly', () => {
    let config = {
      routes: [{
        path: '/:id'
      }, {
        path: '/:bla/:id'
      }, {
        path: '/test/bla',
        html5: [{
          component: 'Comp1'
        }]
      }, {
        path: '/test/:id',
        html5: [{
          component: 'Comp1'
        }, {
          component: 'Comp2'
        }]
      }, {
        path: '/:bla/:id'
      }, {
        path: '/test',
        amphtml: [{}]
      }]
    }
    let c = compileConfig(config)
    expect(JSON.stringify(c.components)).to.equal(JSON.stringify({
      Comp1: 'c0-',
      Comp2: 'c1-'
    }))
    expect(JSON.stringify(c.clientRoutes)).to.equal(JSON.stringify([{
      html5: [{
        component: 'Comp1'
      }],
      path: '/test/bla'
    }, {
      html5: [{
        component: 'Comp1'
      }, {
        component: 'Comp2'
      }],
      path: '/test/:id'
    }]))
    expect(JSON.stringify(c.routes)).to.equal(JSON.stringify([{
      path: '/test/bla',
      html5: [{
        component: 'Comp1'
      }],
      _params: [],
      _depth: 2
    }, {
      path: '/:bla/:id',
      _params: ['bla', 'id'],
      _depth: 2
    }, {
      path: '/:bla/:id',
      _params: ['bla', 'id'],
      _depth: 2
    }, {
      path: '/test/:id',
      html5: [{
        component: 'Comp1'
      }, {
        component: 'Comp2'
      }],
      _params: ['id'],
      _depth: 2
    }, {
      path: '/test',
      amphtml: [{}],
      _params: [],
      _depth: 1
    }, {
      path: '/:id',
      _params: ['id'],
      _depth: 1
    }]))
  })
  it('should sort routes correctly', () => {
    let config = {
      routes: [{
        path: '/:id/test'
      }, {
        path: '/test/:id'
      }]
    }
    let c = compileConfig(config)
    expect(JSON.stringify(c.routes)).to.equal(JSON.stringify([{
      path: '/:id/test',
      _params: ['id'],
      _depth: 2
    }, {
      path: '/test/:id',
      _params: ['id'],
      _depth: 2
    }]))
  })
})
