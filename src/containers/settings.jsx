import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { updateField, save, reset } from '../actions/settings';

function mapStateToProps(state) {
	return _.pick(state.application.settings, 'modified', 'targets', 'current', 'original');
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
		let { targets, current } = this.props;
		return (
			<div id='settings'>
				<div id='content' className='container has-footer'>
					<div className='row'>
						<div className='col-md-12'>
							<h2>Settings</h2>
							<form>
								<div className='form-group'>
									<label>Member Id</label>
									<input
										id='memberId'
										type='text'
										className='form-control'
										placeholder='Member Id'
										value={current.memberId}
										onChange={_.partial(this.handleChange, 'memberId')} />
								</div>
								<div className='form-group'>
									<label>Default Username</label>
									<input
										id='username'
										type='text'
										className='form-control'
										placeholder='Default Username'
										value={current.username}
										onChange={_.partial(this.handleChange, 'username')} />
								</div>
								<div className='form-group'>
									<label>Target Environment</label>
									<select className='form-control' value={current.selectedTargetName} onChange={_.partial(this.handleChange, 'selectedTargetName')}>
										{_.map(targets, (target) => {
											return <option key={target.name} value={target.name}>{target.name}</option>;
										})}
									</select>
								</div>
							</form>
						</div>
					</div>
				</div>
				<footer className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<button className='btn btn-primary' disabled={!this.hasChanges()} onClick={this.handleSave}>Save</button>
							<button className='btn btn-link' disabled={!this.hasChanges()} onClick={this.handleReset}>Reset</button>
						</div>
					</div>
				</footer>
			</div>
		);
	}
});

export default connect(mapStateToProps)(Settings);
