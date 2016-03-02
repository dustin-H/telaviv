
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App.js'

import store from './store/store.js'

import { LookRoot, Presets } from 'react-look'

render(
  <LookRoot config={Presets['react-dom']}>
      <Provider store={store}>
         <App />
      </Provider>
   </LookRoot>,
  document.getElementById('app')
)
