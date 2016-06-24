
import felaPluginUnit from 'fela-plugin-unit'
import felaPluginFriendlyPseudoClass from 'fela-plugin-friendly-pseudo-class'
import felaPluginPrefixer from 'fela-plugin-prefixer'
import felaPluginFallbackValue from 'fela-plugin-fallback-value'

const felaConfig = {
  plugins: [felaPluginUnit('px'), felaPluginFriendlyPseudoClass(), felaPluginPrefixer(), felaPluginFallbackValue()]
}

export default felaConfig
