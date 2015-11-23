// For reference
// document.addEventListener('state-buddy', function(data) {
// 	switch (data.detail.type) {
// 		case 'SEND_STATE':
// 			console.log('state-buddy', data.detail.type);
// 			// let evt = document.createEvent('CustomEvent');
// 			// evt.initCustomEvent('state-buddy', true, true, { type: 'SEND_STATE', state: { mystate: true} });
// 			// document.dispatchEvent(evt);
// 			break;
// 	}
// });
window.addEventListener('message', function (event) {
	if (event.data.type === 'SEND_STATE') {
		chrome.runtime.sendMessage({ type: event.data.type, state: event.data.state });
	}
}, false);

chrome.runtime.onMessage.addListener(function(request) {
	if (request.type === 'GET_STATE' || request.type === 'SET_STATE') {
		window.postMessage(request, '*');
	}
  }
);
