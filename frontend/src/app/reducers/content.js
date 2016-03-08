import * as types from '../constants/ActionTypes.js';

const initialState = {data: []};

export default function content(state = initialState, action) {
  switch (action.type) {
    case types.EXAMPLE_SYNC:
      var newState = Object.assign({}, state);
      newState.example += action.data;
      return newState;
    default:
      return state;
  }
}
