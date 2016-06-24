
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { Provider as ReduxProvider } from 'react-redux'
import App from './containers/App.js'

import createStore from './store/configureStore.js'
import createInitialState from './createInitialState.js'
import { getCache, reset } from '../utils/renderCache.js'

import { createRenderer } from 'fela'
import { Provider as FelaProvider } from 'react-fela'

import felaConfig from './felaConfig'

import { set, get } from './store/store.js'

export default (data, req, res, config) => {
  /* istanbul ignore if */
  if (req.telaviv.timetracking != null) {
    var renderStart = process.hrtime()
  }

  const state = createInitialState(data, req, config)
  const store = createStore(state)

  set(store)
  reset()

  let render = renderToStaticMarkup
  if (req.telaviv.clientRendering === true) {
    render = renderToString
  }

  const renderer = createRenderer(felaConfig)

  const content = render(
    <FelaProvider renderer={ renderer }>
      <ReduxProvider store={ store }>
        <App />
      </ReduxProvider>
    </FelaProvider>
  )
  var cache = getCache()

  const styles = renderer.renderToString()

  const newState = store.getState()

  /* istanbul ignore if */
  if (req.telaviv.timetracking != null) {
    req.telaviv.timetracking.reactRenderTime = process.hrtime(renderStart)[1] / 1000000
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
