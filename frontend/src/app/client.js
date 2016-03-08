
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App.js'

import createStore from './store/configureStore.js'
const store = configureStore(__GLOBAL_INITIAL_REDUX_STATE__ || null);

import {set, get} from './store/store.js'
set(store)

import { LookRoot, Presets } from 'react-look'

render(
  <LookRoot config={Presets['react-dom']}>
      <Provider store={store}>
         <App />
      </Provider>
   </LookRoot>,
  document.getElementById('app')
)
