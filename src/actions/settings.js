export function updateField(field, value) {
	return {
		type: 'SETTINGS_UPDATE_FIELD',
		fieldName: field,
		value: value
	};
}

export function save() {
	return {
		type: 'SETTINGS_SAVE'
	};
}

export function reset() {
	return {
		type: 'SETTINGS_RESET'
	};
}
