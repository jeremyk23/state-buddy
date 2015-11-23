import _ from 'lodash';

export default function reducer(state = {}, action) {
	switch (action.type) {
		case 'INPUT_CHANGE':
			return _.assign({}, state, {
				nameInput: action.input
			});

		default:
			return state;
	}
}
