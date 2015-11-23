import { combineReducers } from 'redux';

import statesReducer from './states';
import settingsReducer from './settings';

export default combineReducers({
	states: statesReducer,
	settings: settingsReducer
});
