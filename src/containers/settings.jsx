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

	handleDelete() {
		let { actions, settings } = this.props;
		actions.triggerDelete(settings.selectedState);
	},

	handleTextInput(evt) {
		let { actions } = this.props;

		let currentText = evt.target.value;
		actions.textInputChange(currentText);
	},

	loadState(evt) {
		let { actions } = this.props;
		actions.loadState(evt.target.value);
		var index = evt.nativeEvent.target.selectedIndex;
		var stateName = evt.nativeEvent.target[index].text;
		actions.selectedStateChange(stateName);
		actions.textInputChange(stateName);
	},

	render() {
		let { states, settings } = this.props;
		let options = _.map(states, (state, name) => {
			let selected = settings.selectedState === name;
			return <option key={name} value={state} selected={selected}>{name}</option>;
		});

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
								<label>States</label>
								<select className='form-control' value={states[settings.selectedState]} onChange={this.loadState}>
									{ options }
								</select>
								<div className='save-button-container'>
									<button className='btn btn-danger' onClick={this.handleDelete}>Delete</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
