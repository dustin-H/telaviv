import * as types from '../constants/ActionTypes.js';

import contentGenerator from '../contentGenerator'
import isServer from '../../utils/isServer.js'

import { get } from '../store/store.js'

import createHistory from 'history/lib/createBrowserHistory'

var history = null

if (isServer !== true) {
  history = createHistory()
  let unlisten = history.listen(location => {
    //get().dispatch(locationChanged(location))
  })

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
          console.log(href);
          // window.location.replace(href);
          callback(false)
          window.location.href = href
          /*unlisten()
          window.onpopstate = function(){
            window.location.href = href
          }
          window.history.go(-1)*/

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
