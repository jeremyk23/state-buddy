import moment from 'moment';

import { getCurrentTab } from '../utils/chrome';

const NAME_PLACEHOLDER = `State on ${moment().format('LLL')}`;

export function addState(name, state) {
	return {
		type: 'ADD_STATE',
		name,
		state
	};
}

export function saveState(state) {
	return (dispatch, getState) => {
		let {
			application: {
				settings: {
					nameInput
				}
			}
		} = getState();

		chrome.storage.local.get((states) => {
			let name = nameInput || NAME_PLACEHOLDER;
			states[name] = state.state;
			chrome.storage.local.set(states);
			dispatch(addState(name, state));
		});
	};
}

export function textInputChange(input) {
	return {
		type: 'INPUT_CHANGE',
		input
	};
}

export function loadState(state) {
	getCurrentTab((tab) => {
		chrome.tabs.sendMessage(tab.id, {'type': 'SET_STATE', state});
	});

	return {
		type: 'SET_STATE'
	};
}
