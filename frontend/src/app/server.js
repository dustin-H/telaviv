
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { Provider } from 'react-redux'
import App from './containers/App.js'

import createStore from './store/configureStore.js'
import createInitialState from './createInitialState.js'
import { getCache, reset } from '../utils/renderCache.js'

import { set, get } from './store/store.js'

import { LookRoot, Presets, StyleSheet } from 'react-look'
import { plugin, renderToString as lookRenderToString } from 'react-look-server-rendering'
import { setClassNameScope } from 'react-look-scope'

var serverConfig = Presets['react-dom']
serverConfig.styleElementId = '_look'
serverConfig.plugins.push(plugin)

setClassNameScope('g')

export default (data, req, res, config) => {
  /* istanbul ignore if */
  if (req.bauhaus.timetracking != null) {
    var renderStart = process.hrtime()
  }
  const state = createInitialState(data, req, config)
  const store = createStore(state)

  set(store)
  reset()

  let render = renderToStaticMarkup
  if (req.bauhaus.clientRendering === true) {
    render = renderToString
  }

  const content = render(
    <LookRoot config={ serverConfig }>
      <Provider store={ store }>
        <App />
      </Provider>
    </LookRoot>
  )
  var cache = getCache()

  // const styles = StyleSheet.renderToString(serverConfig.prefixer)
  const styles = lookRenderToString(serverConfig.prefixer)

  const newState = store.getState()

  /* istanbul ignore if */
  if (req.bauhaus.timetracking != null) {
    req.bauhaus.timetracking.reactRenderTime = process.hrtime(renderStart)[1] / 1000000
  }

  var renderData = {
    content: content,
    styles: styles,
    state: newState
  }

  if (cache.title != null) {
    renderData.title = cache.title
  }

  if (cache.head != null) {
    renderData.head = cache.head
  }

  if (cache.redirect != null) {
    if (cache.redirectCode == null) {
      res.redirect(cache.redirect)
    } else {
      res.redirect(cache.redirectCode, cache.redirect)
    }
    return null
  } else {
    return renderData
  }
}
