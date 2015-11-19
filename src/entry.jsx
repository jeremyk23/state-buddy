import _ from 'lodash';
import appLess from './app.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import initialStateJson from './initial-state.json';
import App from './app';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import configureStore from './store';

document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.sync.get({
		memberId: null,
		selectedTargetName: null,
		username: null,
		authToken: null
	}, (current) => {

		const initialState = _.merge(Object.assign({}, initialStateJson), {
			application: {
				settings: {
					current: current,
					original: current
				}
			}
		});

		const store = configureStore(initialState);

		const Root = React.createClass({
			render: function () {
				return (
					<Provider store={store}>
						<App />
					</Provider>
				);
			}
		});

		ReactDOM.render(<Root />, document.getElementById('root'));
	});
});
