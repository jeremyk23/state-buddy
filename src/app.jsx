import React from 'react';
import { connect } from 'react-redux';
import { Navbar, NavBrand } from 'react-bootstrap';
import Settings from './containers/settings';

// Move this in a library
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
