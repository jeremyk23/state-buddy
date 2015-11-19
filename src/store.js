import thunk from 'redux-thunk';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';

import applicationReducers from './reducers/index';

const reducer = combineReducers({
	application: applicationReducers
});

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

const finalCreateStore = compose()(createStoreWithMiddleware);

export default function configureStore(initialState) {
	const store = finalCreateStore(reducer, initialState);

	return store;
}
