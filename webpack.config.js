var webpack = require('webpack')
var fs = require('fs')
var telaviv = require('./getWebpackConfig.js')

var productionPlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
})

try {
  fs.mkdirSync(moduleCreatorsPath)
} catch ( e ) {}

var config = {
  name: 'telaviv',
  plugins: [productionPlugin],
  context: __dirname + '/',
  entry: __dirname + '/src/app/client.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/lib'
  },
  externals: [{
    'inline-style-linter': 'true'
  }],
  resolve: {
    packageAlias: 'browser'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['add-module-exports', 'transform-react-display-name', 'transform-decorators-legacy']
      }
    }]
  }
}

var c = telaviv('themes', 'build')
c.push(config)

module.exports = c;
