
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import App from './containers/App.js'

import createStore from './store/configureStore.js'
import createInitialState from './createInitialState.js'
import { getCache, reset } from '../utils/renderCache.js'

import { set, get } from './store/store.js'

import { LookRoot, Presets, StyleSheet } from 'react-look'
var serverConfig = Presets['react-dom']
serverConfig.styleElementId = '_look'

export default (data, req, res) => {
  try {
    const state = createInitialState(data, req)
    const store = createStore(state)

    set(store)
    reset()

    const content = renderToString(
      <LookRoot config={ serverConfig }>
        <Provider store={ store }>
          <App />
        </Provider>
      </LookRoot>
    )
    var cache = getCache()

    const styles = StyleSheet.renderToString(serverConfig.prefixer)
    const newState = store.getState()

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
  } catch ( e ) {
    console.error(e.stack)
  }
}
