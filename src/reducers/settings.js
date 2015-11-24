import _ from 'lodash';

export default function reducer(state = {}, action) {
	switch (action.type) {
		case 'INPUT_CHANGE':
			return _.assign({}, state, {
				nameInput: action.input
			});
		case 'SELECTED_STATE_CHANGE':
			return _.assign({}, state, {
				selectedState: action.name.trim()
			});

		default:
			return state;
	}
}
