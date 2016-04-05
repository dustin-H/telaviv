var webpack = require('webpack')
var fs = require('fs')
var _ = require('lodash')
var moduleLoaderTemplate = _.template(fs.readFileSync(require.resolve('./moduleLoaderTemplate.js')))

var productionPlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
})

var themesPath = __dirname + '/src/themes'
var moduleCreatorsPath = __dirname + '/.moduleCreators'
var themesExportPath = __dirname + '/client-build/themes'

var themes = fs.readdirSync(themesPath)

if (themes.indexOf('.DS_Store') >= 0) {
  themes.splice(themes.indexOf('.DS_Store'), 1)
}

var modules = []
for (var i in themes) {
  var mods = fs.readdirSync(themesPath + '/' + themes[i])
  if (mods.indexOf('.DS_Store') >= 0) {
    mods.splice(mods.indexOf('.DS_Store'), 1)
  }
  for (var j in mods) {
    mods[j] = {
      path: themesPath + '/' + themes[i] + '/' + mods[j],
      exportPath: themesExportPath + '/' + themes[i],
      name: mods[j],
      theme: themes[i]
    }
  }
  modules = modules.concat(mods)
}
console.log(modules)

try {
  fs.mkdirSync(moduleCreatorsPath)
} catch ( e ) {}

var config = [{
  name: 'telaviv',
  plugins: [productionPlugin],
  context: __dirname + '/',
  entry: __dirname + '/src/app/client.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/client-build/'
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
}]

for (var i in modules) {
  var mod = modules[i]
  var creatorPath = moduleCreatorsPath + '/' + mod.name + '-' + mod.theme + '.js'
  var src = moduleLoaderTemplate(mod)
  fs.writeFileSync(creatorPath, src)

  config.push({
    name: 'telaviv-' + mod.theme + '-' + mod.name,
    plugins: [productionPlugin],
    context: __dirname + '/',
    entry: creatorPath,
    output: {
      filename: mod.name + '.js',
      path: __dirname + '/client-build/themes/' + mod.theme
    },
    externals: [{
      react: 'var __GLOBAL__.npm.react',
      'react-look': 'var __GLOBAL__.npm["react-look"]',
      /*'react/lib/ReactTransitionGroup': 'var __GLOBAL__.npm["react-lib-ReactTransitionGroup"]',
      'react/lib/update': 'var __GLOBAL__.npm["react-lib-update"]',
      'react/lib/ReactComponentWithPureRenderMixin': 'var __GLOBAL__.npm["react-lib-ReactComponentWithPureRenderMixin"]',
      'react/lib/ReactFragment': 'var __GLOBAL__.npm["react-lib-ReactFragment"]',*/
      'react-dom': 'var __GLOBAL__.npm["react-dom"]',
      superagent: 'var __GLOBAL__.npm["superagent"]',
      'react-look-scope': 'var __GLOBAL__.npm["react-look-scope"]'
    }],
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
  })
}

module.exports = config;
