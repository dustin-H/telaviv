import * as types from '../constants/ActionTypes.js';

import matchRoutes from '../../router/matchRoutes.js'
import isServer from '../../utils/isServer.js'

import { get } from '../store/store.js'

import { createHistory } from 'history/lib/createBrowserHistory'
if (isServer !== true) {
  let history = createHistory()
  let unlisten = history.listen(location => {
    get().dispatch(locationChanged(location))
  })

  function locationChanged(location) {
    return (dispatch, getState) => {
      var state = getState()
      var route = matchRoutes(state.content.routes, location)

      dispatch({
        type: types.CONTENT_LOCATION_CHANGED,
        location,
        route
      })
    }
  }
}

export function pushLocation(location) {
  history.push(location)
}

export function reload() {
  return (dispatch, getState) => {
    var state = getState()
    dispatch(pushLocation(state.router.location))
  }
}
