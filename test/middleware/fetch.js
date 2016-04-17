
import fetch from '../../src/middleware/fetch.js'
const config = {apiAddress: 'http://localhost:4217/'}

describe('The fetch middleware', () => {
  before((done) => {
    TestUtils.fetchApi(4217, done)
  })
  it('should return a function', () => {
    let mid = fetch(config)
    expect(mid).to.be.a('function')
  })
  it('should call next with 500 when no fetching data is available', () => {
    let mid = fetch(config)

    var req = {telaviv: {}}
    var res = {}
    const next = sinon.spy()

    mid(req, res, next)

    expect(next).to.have.been.calledOnce
    expect(next).to.have.been.calledWith(500)
  })
  it('should fetch nothing if fetching data is an empty array', (done) => {
    let mid = fetch(config)

    var req = {
      telaviv: {
        fetch: {
          components: [],
          params: {}
        }
      },
      headers: {}
    }
    var res = {}

    mid(req, res, (next) => {
      expect(req.telaviv.fetch.data).to.be.an('array')
      expect(req.telaviv.fetch.data.length).to.equal(0)
      done()
    })

  })
  it('should fetch nothing if fetching data includes no sources', (done) => {
    let mid = fetch(config)

    var req = {
      telaviv: {
        fetch: {
          components: [{
            component: 'Footer'
          }],
          params: {}
        }
      },
      headers: {}
    }
    var res = {}

    mid(req, res, (next) => {
      expect(req.telaviv.fetch.data).to.be.an('array')
      expect(req.telaviv.fetch.data.length).to.equal(1)
      expect(req.telaviv.fetch.data[0].component).to.equal('Footer')
      expect(req.telaviv.fetch.data[0].data).to.be.an('object')
      expect(JSON.stringify(req.telaviv.fetch.data[0].data)).to.equal('{}')
      done()
    })
  })
  it('should pass the options object correctly', (done) => {
    let mid = fetch(config)

    var req = {
      telaviv: {
        fetch: {
          components: [{
            component: 'Footer',
            options: {
              test: ':id'
            }
          }],
          params: {
            id: 'MyId'
          }
        }
      },
      headers: {}
    }
    var res = {}

    mid(req, res, (next) => {
      expect(req.telaviv.fetch.data).to.be.an('array')
      expect(req.telaviv.fetch.data.length).to.equal(1)
      expect(req.telaviv.fetch.data[0].component).to.equal('Footer')
      expect(req.telaviv.fetch.data[0].data).to.be.an('object')
      expect(JSON.stringify(req.telaviv.fetch.data[0].options)).to.equal(JSON.stringify({
        test: 'MyId'
      }))
      expect(JSON.stringify(req.telaviv.fetch.data[0].data)).to.equal('{}')
      done()
    })
  })
  it('should fetch a simple api source and forward the correct headers and id', (done) => {
    let mid = fetch(config)

    var req = {
      telaviv: {
        fetch: {
          components: [
            {
              component: 'Header',
              data: {
                type: 'REST',
                url: '/mirror/:id'
              }
            }
          ],
          params: {
            id: 'SomeId'
          }
        }
      },
      headers: {
        'foo-bar': 'Secret Key'
      }
    }

    var res = {set: (k, v) => {console.log('SET', k, v)}}

    mid(req, res, (next) => {
      expect(next).to.be.undefined
      expect(req.telaviv.fetch.data).to.be.an('array')
      expect(req.telaviv.fetch.data.length).to.equal(1)
      expect(req.telaviv.fetch.data[0].component).to.equal('Header')
      expect(req.telaviv.fetch.data[0].data).to.be.an('object')
      let d = req.telaviv.fetch.data[0].data
      expect(d.id).to.equal('SomeId')
      expect(d.test).to.equal('mirror')
      expect(d.headers['foo-bar']).to.equal('Secret Key')
      done()
    })
  })
  it('should detect the most important error from multiple api errors (first 404)', (done) => {
    let mid = fetch(config)

    var req = {
      telaviv: {
        fetch: {
          components: [
            {
              component: 'Header',
              data: {
                type: 'REST',
                url: '/error/500?time=100'
              }
            }, {
              component: 'Footer',
              data: {
                type: 'REST',
                url: '/error/404'
              }
            }
          ]
        }
      },
      headers: {}
    }

    var res = {set: (k, v) => {console.log('SET', k, v)}}

    mid(req, res, (next) => {
      expect(next).to.equal(404)
      done()
    })
  })
  it('should detect the most important error from multiple api errors (first 500)', (done) => {
    let mid = fetch(config)

    var req = {
      telaviv: {
        fetch: {
          components: [
            {
              component: 'Header',
              data: {
                type: 'REST',
                url: '/error/500'
              }
            }, {
              component: 'Footer',
              data: {
                type: 'REST',
                url: '/error/404?time=100'
              }
            }
          ]
        }
      },
      headers: {}
    }

    var res = {set: (k, v) => {console.log('SET', k, v)}}

    mid(req, res, (next) => {
      expect(next).to.equal(404)
      done()
    })
  })
  it('should merge cache-control headers with max-age numbers', (done) => {
    let mid = fetch(config)

    var req = {
      telaviv: {
        fetch: {
          components: [
            {
              component: 'Header',
              data: {
                type: 'REST',
                url: '/cache/max-age=500'
              }
            }, {
              component: 'Footer',
              data: {
                type: 'REST',
                url: '/cache/max-age=200'
              }
            }
          ]
        }
      },
      headers: {}
    }
    var res = {set: sinon.spy()}

    mid(req, res, (next) => {
      expect(next).to.be.undefined
      expect(res.set).to.be.calledOnce
      expect(res.set).to.be.calledWith('Cache-Control', 'max-age=200')
      done()
    })
  })
  it('should merge cache-control headers with private and public keys', (done) => {
    let mid = fetch(config)

    var req = {
      telaviv: {
        fetch: {
          components: [
            {
              component: 'Header',
              data: {
                type: 'REST',
                url: '/cache/private'
              }
            }, {
              component: 'Footer',
              data: {
                type: 'REST',
                url: '/cache/public'
              }
            }
          ]
        }
      },
      headers: {}
    }
    var res = {set: sinon.spy()}

    mid(req, res, (next) => {
      expect(next).to.be.undefined
      expect(res.set).to.be.calledOnce
      expect(res.set).to.be.calledWith('Cache-Control', 'private')
      done()
    })
  })
  it('should merge cache-control headers with public key and max-age', (done) => {
    let mid = fetch(config)

    var req = {
      telaviv: {
        fetch: {
          components: [
            {
              component: 'Header',
              data: {
                type: 'REST',
                url: '/cache/max-age=200'
              }
            }, {
              component: 'Footer',
              data: {
                type: 'REST',
                url: '/cache/public'
              }
            }
          ]
        }
      },
      headers: {}
    }
    var res = {set: sinon.spy()}

    mid(req, res, (next) => {
      expect(next).to.be.undefined
      expect(res.set).to.be.calledOnce
      expect(res.set).to.be.calledWith('Cache-Control', 'public, max-age=200')
      done()
    })
  })
  it('should merge cache-control headers with no-store key and max-age', (done) => {
    let mid = fetch(config)

    var req = {
      telaviv: {
        fetch: {
          components: [
            {
              component: 'Header',
              data: {
                type: 'REST',
                url: '/cache/max-age=200'
              }
            }, {
              component: 'Footer',
              data: {
                type: 'REST',
                url: '/cache/no-store'
              }
            }
          ]
        }
      },
      headers: {}
    }
    var res = {set: sinon.spy()}

    mid(req, res, (next) => {
      expect(next).to.be.undefined
      expect(res.set).to.be.calledOnce
      expect(res.set).to.be.calledWith('Cache-Control', 'no-store')
      done()
    })
  })
  it('should merge cache-control headers with no-cache key and max-age', (done) => {
    let mid = fetch(config)

    var req = {
      telaviv: {
        fetch: {
          components: [
            {
              component: 'Header',
              data: {
                type: 'REST',
                url: '/cache/max-age=200'
              }
            }, {
              component: 'Footer',
              data: {
                type: 'REST',
                url: '/cache/no-cache'
              }
            }
          ]
        }
      },
      headers: {}
    }
    var res = {set: sinon.spy()}

    mid(req, res, (next) => {
      expect(next).to.be.undefined
      expect(res.set).to.be.calledOnce
      expect(res.set).to.be.calledWith('Cache-Control', 'no-cache')
      done()
    })
  })
  it('should merge cache-control headers with no-cache and no-store keys', (done) => {
    let mid = fetch(config)

    var req = {
      telaviv: {
        fetch: {
          components: [
            {
              component: 'Header',
              data: {
                type: 'REST',
                url: '/cache/no-store'
              }
            }, {
              component: 'Footer',
              data: {
                type: 'REST',
                url: '/cache/no-cache'
              }
            }
          ]
        }
      },
      headers: {}
    }
    var res = {set: sinon.spy()}

    mid(req, res, (next) => {
      expect(next).to.be.undefined
      expect(res.set).to.be.calledOnce
      expect(res.set).to.be.calledWith('Cache-Control', 'no-cache, no-store')
      done()
    })
  })
  it('should ignore invalid cache-control headers', (done) => {
    let mid = fetch(config)

    var req = {
      telaviv: {
        fetch: {
          components: [
            {
              component: 'Header',
              data: {
                type: 'REST',
                url: '/cache/foobar:lol'
              }
            }
          ]
        }
      },
      headers: {}
    }
    var res = {set: sinon.spy()}

    mid(req, res, (next) => {
      expect(next).to.be.undefined
      expect(res.set).to.be.calledNever
      done()
    })
  })
  it('should forward single cookie headers', (done) => {
    let mid = fetch(config)

    var req = {
      telaviv: {
        fetch: {
          components: [
            {
              component: 'Header',
              data: {
                type: 'REST',
                url: '/cookie/first/val1'
              }
            }
          ]
        }
      },
      headers: {}
    }
    var res = {set: sinon.spy()}

    mid(req, res, (next) => {
      expect(next).to.be.undefined
      expect(res.set).to.be.calledOnce
      expect(res.set).to.be.calledWith('Set-Cookie', ['first=val1; Path=/'])
      done()
    })
  })
  it('should merge cookie headers', (done) => {
    let mid = fetch(config)

    var req = {
      telaviv: {
        fetch: {
          components: [
            {
              component: 'Header',
              data: {
                type: 'REST',
                url: '/cookie/first/val1'
              }
            }, {
              component: 'Footer',
              data: {
                type: 'REST',
                url: '/cookie/second/val2'
              }
            }
          ]
        }
      },
      headers: {}
    }
    var res = {set: sinon.spy()}

    mid(req, res, (next) => {
      expect(next).to.be.undefined
      expect(res.set).to.be.calledOnce
      expect(res.set.args[0].length).to.equal(2)
      expect(res.set.args[0][0]).to.equal('Set-Cookie')
      expect(res.set.args[0][1]).to.contain('first=val1; Path=/')
      expect(res.set.args[0][1]).to.contain('second=val2; Path=/')
      done()
    })
  })
})
