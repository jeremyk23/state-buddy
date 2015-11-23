export function getCurrentTab(callback) {
	var queryInfo = {
		active: true,
		currentWindow: true
	};
	chrome.tabs.query(queryInfo, function (tabs) {
		callback(tabs[0]);
	});
}
