import { combineReducers } from 'redux'
import content from './content.js'
import config from './config.js'

const rootReducer = combineReducers({
  content,
  config
});

export default rootReducer;
