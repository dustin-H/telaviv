
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import App from './containers/App.js'

import createStore from './store/configureStore.js'
import createInitialState from './createInitialState.js'

import { LookRoot, Presets, StyleContainer } from 'react-look'

export default (data, req, cb) => {
  const state = createInitialState(data, req)
  const store = createStore(state)
  const content = renderToString(
    <LookRoot config={Presets['react-dom']}>
        <Provider store={store}>
           <App />
        </Provider>
     </LookRoot>
  )


  const styles = StyleContainer.renderStaticStyles(req.get('user-agent'))
  const newState = store.getState()

  cb(content, styles, newState)
}
