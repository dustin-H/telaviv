var webpack = require('webpack')
var fs = require('fs')
var _ = require('lodash')
var resolve = require('path').resolve
var moduleLoaderTemplate = _.template(fs.readFileSync(require.resolve('./moduleLoaderTemplate.js')))

const getConfig = (themesArg, buildArg) => {
  var context = resolve('')

  var productionPlugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
  })

  var themesPath = resolve(themesArg)
  var moduleCreatorsPath = resolve('.telavivModuleCreators')
  var themesExportPath = resolve(buildArg)

  global.TELAVIV = {
    themesPath: themesPath,
    moduleCreatorsPath: moduleCreatorsPath,
    themesExportPath: themesExportPath,
    serverExportPath: resolve(themesExportPath, 'server')
  }

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
        path: resolve(themesPath, themes[i], mods[j]),
        exportPath: resolve(themesExportPath, 'client', themes[i]),
        name: mods[j],
        theme: themes[i]
      }
    }
    modules = modules.concat(mods)
  }

  try {
    fs.mkdirSync(moduleCreatorsPath)
  } catch ( e ) {}

  var config = []

  for (var i in modules) {
    var mod = modules[i]
    var creatorPath = moduleCreatorsPath + '/' + mod.name + '-' + mod.theme + '.js'
    var src = moduleLoaderTemplate(mod)
    fs.writeFileSync(creatorPath, src)

    config.push({
      name: 'telaviv-' + mod.theme + '-' + mod.name,
      plugins: [productionPlugin],
      context: context + '/',
      entry: creatorPath,
      output: {
        filename: mod.name + '.js',
        path: mod.exportPath
      },
      externals: [{
        react: 'var __GLOBAL__.npm.react',
        'react-fela': 'var __GLOBAL__.npm["react-fela"]',
        'fela-styles-connector': 'var __GLOBAL__.npm["fela-styles-connector"]',
        /*'react/lib/ReactTransitionGroup': 'var __GLOBAL__.npm["react-lib-ReactTransitionGroup"]',
        'react/lib/update': 'var __GLOBAL__.npm["react-lib-update"]',
        'react/lib/ReactComponentWithPureRenderMixin': 'var __GLOBAL__.npm["react-lib-ReactComponentWithPureRenderMixin"]',
        'react/lib/ReactFragment': 'var __GLOBAL__.npm["react-lib-ReactFragment"]',*/
        'react-dom': 'var __GLOBAL__.npm["react-dom"]',
        superagent: 'var __GLOBAL__.npm["superagent"]'
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
        }],
        postLoaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: require.resolve('./nodeExportLoader.js')
        }]
      }
    })
  }

  return config
}

module.exports = getConfig;
