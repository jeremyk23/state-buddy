import _ from 'lodash';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import * as settingsActions from '../actions/state';
import { getCurrentTab } from '../utils/chrome';

const NAME_PLACEHOLDER = `State on ${moment().format('LLL')}`;

function mapStateToProps(state) {
	return state.application;
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(settingsActions, dispatch)
	};
}

const Settings = React.createClass({
	componentDidMount() {
		let { actions } = this.props;
		chrome.runtime.onMessage.addListener(function(request) {
				if (request.type === 'SEND_STATE' ) {
					actions.saveState(request);
				}
			}
		);
	},

	triggerSave() {
		getCurrentTab((tab) => {
			chrome.tabs.sendMessage(tab.id, {'type': 'GET_STATE'});
		});
	},

	handleTextInput(evt) {
		let { actions } = this.props;

		let currentText = evt.target.value;
		actions.textInputChange(currentText);
	},

	loadState(evt) {
		let { actions } = this.props;
		actions.loadState(evt.target.value);
	},

	render() {
		let { states, settings } = this.props;

		return (
			<div id='settings'>
				<div id='content' className='container has-footer'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='row'>
								<div className='col-md-12'>
									<div className='form-group'>
										<label>Save State</label>
										<input
											id='stateName'
											type='text'
											className='form-control'
											placeholder={ NAME_PLACEHOLDER }
											value={ settings.nameInput }
											onChange={ this.handleTextInput } />
										<div className='save-button-container'>
											<button className='btn btn-primary' onClick={this.triggerSave}>Save</button>
										</div>
									</div>
								</div>
							</div>
							<div className='form-group'>
								<label>History</label>
								<select className='form-control' value={'Select'} onChange={this.loadState}>
									{_.map(states, (state, name) => {
									return <option key={name} value={state}>{name}</option>;
									})}
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
