import createHistory from 'history/lib/createBrowserHistory'
import * as types from '../constants/ActionTypes.js'
import contentGenerator from '../contentGenerator'
import { get } from '../store/store.js'

let history = createHistory()

history.listenBefore(function(location, callback) {
  get().dispatch(locationChanged(location, callback))
})

function locationChanged(location, callback) {
  return (dispatch, getState) => {

    dispatch(setLoading())
    var state = getState()

    contentGenerator(location, state.config.routes, (err, data) => {
      if (err != null) {
        var href = history.createHref(location)
        callback(false)
        window.location.href = href
        return
      }

      callback(true)
      dispatch({
        type: types.CONTENT_LOCATION_CHANGED,
        location,
        data
      })
    })
  }
}

function setLoading() {
  return {type: types.CONTENT_SET_LOADING}
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
