import _ from 'lodash';

export default function reducer(state = {}, action) {
	switch (action.type) {
		case 'ADD_STATE':
			return _.assign({}, state, {
				[action.name.trim()]: action.state
			});
		case 'DELETE_STATE':
		return _.omit(state, action.stateToDelete);

		default:
			return state;
	}
}
