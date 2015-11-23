import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { updateField, save, reset } from '../actions/settings';
import moment from 'moment'

function mapStateToProps(state) {
	return _.pick(state.application.settings, 'modified', 'previousStates', 'current', 'original');
}

const Settings = React.createClass({
	hasChanges() {
		return this.props.modified;
	},

	handleChange(fieldName, evt) {
		this.props.dispatch(updateField(fieldName, evt.target.value));
	},

	handleSave() {
		this.props.dispatch(save());
	},

	handleReset() {
		this.props.dispatch(reset());
	},

	render() {
		let { previousStates, current } = this.props;
		return (
			<div id='settings'>
				<div id='content' className='container has-footer'>
					<div className='row'>
						<div className='col-md-12'>
							<form>
								<div className='row'>
									<div className='col-md-12'>
										<div className='form-group'>
											<label>Save State</label>
											<input
												id='stateName'
												type='text'
												className='form-control'
												value={`State on ${moment().format('LLL')}`}
												onChange={_.partial(this.handleChange, 'stateName')} />
											<div className='save-button-container'>
												<button className='btn btn-primary' onClick={this.handleSave}>Save</button>
											</div>
										</div>
									</div>
								</div>
								<div className='form-group'>
									<label>History</label>
									<select className='form-control' value={current.selectedPreviousState} onChange={_.partial(this.handleChange, 'selectedPreviousState')}>
										{_.map(previousStates, (target) => {
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
