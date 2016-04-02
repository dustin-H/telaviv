var webpack = require('webpack')
var fs = require('fs')
var ClientServerResolver = require('./ClientServerResolver.js')
var _ = require('lodash')
var moduleLoaderTemplate = _.template(fs.readFileSync(require.resolve('./moduleLoaderTemplate.js')))

var productionPlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
})

var themesPath = __dirname + '/frontend/src/themes'
var moduleCreatorsPath = __dirname + '/frontend/.moduleCreators'
var themesExportPath = __dirname + '/frontend/client-build/themes'

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
  name: 'bauhaus-frontend',
  plugins: [productionPlugin],
  context: __dirname + '/',
  entry: __dirname + '/frontend/src/app/client.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/frontend/client-build/'
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
  // var modulePath = modulesPath + '/' + name + '/index.js'
  // var reqModulePath = modulesPath + '/' + modulePath + '/index.js'
  var creatorPath = moduleCreatorsPath + '/' + mod.name + '-' + mod.theme + '.js'
  // var src = 'var c = __GLOBAL__.INITIAL_STATE.config.components; var r = require("react-look-scope"); var t = r.getClassNameScope(); r.setClassNameScope(c["'++'"]); __GLOBAL__.exportDefault = require("' + mod.path + '")'
  var src = moduleLoaderTemplate(mod)
  fs.writeFileSync(creatorPath, src)

  config.push({
    name: 'bauhaus-frontend-' + mod.theme + '-' + mod.name,
    plugins: [productionPlugin],
    context: __dirname + '/',
    entry: creatorPath,
    output: {
      filename: mod.name + '.js',
      path: __dirname + '/frontend/client-build/themes/' + mod.theme
    },
    resolve: {
      alias: {
        react: 'bauhaus-ui-module-utils/npm/react',
        'react-dom': 'bauhaus-ui-module-utils/npm/react-dom',
        'react-look': 'bauhaus-ui-module-utils/npm/react-look',
        superagent: 'bauhaus-ui-module-utils/npm/superagent',
        'react-look-scope': 'react-look-scope'
      }
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

// fs.writeFileSync(__dirname + '/src/coreModules.js', 'module.exports = ' + JSON.stringify(modules))

module.exports = config;
