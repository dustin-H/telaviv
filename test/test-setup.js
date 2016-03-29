require('babel-core/register')({
  presets: [
    'react',
    'es2015',
    'stage-0'
  ],
  plugins: [
    'add-module-exports'
  ]
})


var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
chai.use(sinonChai)

var TestUtils = require('./test-utils')
var React = require('react')

global.React = React
global.Component = React.Component
global.expect = chai.expect
global.sinon = sinon
global.TestUtils = TestUtils
