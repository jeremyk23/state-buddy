import { combineReducers } from 'redux';

import settingsReducer from './states';

export default combineReducers({
	states: settingsReducer
});
