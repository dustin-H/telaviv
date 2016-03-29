


import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { LookRoot, Presets } from 'react-look'

import createStore from './store/configureStore.js'
import { ensureComponents } from './loader'
import { set, get } from './store/store.js'

const store = createStore(__GLOBAL_INITIAL_REDUX_STATE__ || null);

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

    console.log('RENDER');

    render(
      <LookRoot config={ Presets['react-dom'] }>
        <Provider store={ store }>
          <App />
        </Provider>
      </LookRoot>,
      document.getElementById('app')
    )
  })
}
