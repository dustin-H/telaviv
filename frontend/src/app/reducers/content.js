import * as types from '../constants/ActionTypes.js'

const initialState = {data: [], routes: {}} // This will never be used, because the state gets initialized by bauhaus before

export default function content(state = initialState, action) {
  /* istanbul ignore next */
  switch (action.type) {
    case types.CONTENT_LOCATION_CHANGED:
      var newState = Object.assign({}, state)
      newState.location = action.location
      newState.data = action.data
      newState.loading = false
      return newState
    case types.CONTENT_SET_LOADING:
      var newState = Object.assign({}, state)
      newState.loading = true
      return newState
    default:
      return state
  }
}
