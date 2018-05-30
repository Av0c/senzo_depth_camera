import * as a from '../actions/data';

const initialState = {
	users: [],
	items: [],
	comments: [],
};

export default (state = initialState, action ) => {
	console.log(action)
	switch (action.type) {
		case a.RECEIVE_DATA: {
			return Object.assign({}, {
				...state,
				[action.key]: action.data,
			})
		}

		default: {
			return state;
		}
	}
}
