import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { saveState } from '../actions/states';

function mapStateToProps(state) {
	return state.application;
}

const Settings = React.createClass({
	handleSave() {
		chrome.runtime.sendMessage({ type: 'GET_STATE' });
	},

	render() {
		let { states } = this.props;

		return (
			<div id='settings'>
				<div id='content' className='container has-footer'>
					<div className='row'>
						<div className='col-md-12'>
							<form>
								<div className='form-group'>
									<div className='row'>
										<div className='col-md-6'>
											<label>Save State</label>
										</div>
										<div className='col-md-6'>
											<button className='btn btn-primary' onClick={this.handleSave}>Save</button>
										</div>
									</div>
								</div>
								<div className='form-group'>
									<label>History</label>
									<select className='form-control' value={states} onChange={console.log.bind(console)}>
										{_.map(states, (target) => {
											return <option key={target.name} value={target.name}>{target.name}</option>;
											})}
									</select>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default connect(mapStateToProps)(Settings);
