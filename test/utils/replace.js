
//import app from '../../src/app.js'
import { objectReplacer, replaceAll } from '../../src/utils/replace.js'

describe('The objectReplacer', () => {
  it('should replace all params deep in an object', () => {
    let obj = {
      test: 'data',
      here: ':p1',
      data: ['lol', ':p2'],
      number: 42,
      demo: {
        arr: [{
          here: ':p2',
          also: 'rofl'
        }, {
          here: ':p1',
          also: 'rofl'
        }]
      }
    }
    let params = {p1: 'ParameterOne', p2: 'ParameterTwo'}

    let expected = JSON.stringify({
      test: 'data',
      here: params.p1,
      data: ['lol', params.p2],
      number: 42,
      demo: {
        arr: [{
          here: params.p2,
          also: 'rofl'
        }, {
          here: params.p1,
          also: 'rofl'
        }]
      }
    })

    let out = objectReplacer(obj, params)
    expect(JSON.stringify(out)).to.equal(expected)
  })
})
describe('The replaceAll function', () => {
  it('should replace all matches in a string', () => {
    let str = 'hello:codeTest:code'
    let expected = 'helloREPLTestREPL'

    let out = replaceAll(str, ':code', 'REPL')
    expect(out).to.equal(expected)
  })
})
