
import React from 'react'
import { render } from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'

import createStore from './store/configureStore.js'
import { ensureComponents } from './loader'
import { set, get } from './store/store.js'

import { createRenderer } from 'fela'
import { Provider as FelaProvider } from 'react-fela'

import felaConfig from './felaConfig'

const store = createStore(__GLOBAL__.INITIAL_STATE || null);

set(store)

// import App from './containers/App.js'

const state = store.getState()

var components = []

for (var i in state.content.data) {
  components.push(state.content.data[i].component)
}
window.onload = function() {
  ensureComponents(components, function(ok) {
    if (ok !== true) {
      return console.error('Could not load all components! => NO CLIENTRENDERING!')
    }

    // Sadly need to do this here, because bable would sort a normal import. Before loading this module the store MUST be initialized! Found no better solution!
    var App = require('./containers/App.js');

    const renderer = createRenderer(felaConfig)

    const mountNode = document.getElementById('_fela')

    render(
      <FelaProvider renderer={ renderer } mountNode={ mountNode }>
        <ReduxProvider store={ store }>
          <App />
        </ReduxProvider>
      </FelaProvider>,
      document.getElementById('app')
    )
  })
}
