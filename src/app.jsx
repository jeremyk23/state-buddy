import React from 'react';
import { connect } from 'react-redux';
import { Navbar, NavBrand } from 'react-bootstrap';
import Settings from './containers/settings';

// Move this in a library
function getCurrentTab(callback) {
	var queryInfo = {
		active: true,
		currentWindow: true
	};
	chrome.tabs.query(queryInfo, function (tabs) {
		callback(tabs[0]);
	});
}

getCurrentTab((tab) => {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			if (request.type === 'SEND_STATE' ) {
				console.log('YES!!!!', request.state);
			}
		}
	);
});

function mapStateToProps(state) {
	return state;
}

const App = React.createClass({
	render() {
		return (
			<div id="app">
				<Navbar fixedTop={true}>
					<NavBrand>State Buddy</NavBrand>
				</Navbar>
				<Settings></Settings>
			</div>
		);
	}
});

export default connect(
  mapStateToProps
)(App);
