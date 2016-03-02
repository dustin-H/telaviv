
import configureStore from './configureStore.js'

const store = configureStore(__GLOBAL_INITIAL_REDUX_STATE__ || null);
export default store;
