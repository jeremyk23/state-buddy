export default function reducer(state = {}, action) {
	const { current, original } = state;
	switch (action.type) {
		case 'SETTINGS_UPDATE_FIELD':
			let newCurrent = Object.assign({}, current);
			newCurrent[action.fieldName] = action.value;
			return Object.assign({}, state, {
				modified: true,
				current: newCurrent
			});

		case 'SETTINGS_RESET':
			return Object.assign({}, state, {
				modified: false,
				current: Object.assign({}, original)
			});

		case 'SETTINGS_SAVE':
			chrome.storage.sync.set(_.pick(current, 'memberId', 'authToken', 'selectedPreviousState', 'username'), () => {});
			return Object.assign({}, state, {
				modified: false,
				original: Object.assign({}, current)
			});

		default:
			return state;
	}
}
