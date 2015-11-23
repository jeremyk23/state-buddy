import _ from 'lodash';

export default function reducer(state = {}, action) {
	switch (action.type) {
		case 'ADD_STATE':
			return _.assign({}, state, {
				[action.name]: action.state
			});

		default:
			return state;
	}
}
