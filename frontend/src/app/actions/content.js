import * as types from '../constants/ActionTypes.js';

export function sync(data) {
	return {
		type: types.EXAMPLE_SYNC,
		data
	};
}

export function async() {
	return(dispatch, getState) => {
			dispatch(sync('SOME DATA '));
	}
}
