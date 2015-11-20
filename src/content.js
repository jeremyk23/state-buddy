console.log('CONTENT.js');


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

function receiveMessage(event) {
	console.log('CONTENT: Event', event);
}
window.addEventListener('message', receiveMessage, false);


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
		console.log('CONTENT: FORWARD', request);
		// Forward messages from background extension
		window.postMessage(request, '*');
		// console.log(request, sender, sendResponse);
    // if (request.type === 'GET_STATE' ) {
		//
    //   console.log('CONTENT', 'firstHref ****');
		//
		// 	// const evt = document.createEvent('CustomEvent');
		// 	// evt.initCustomEvent('state-buddy', true, true, { type: 'GET_STATE' });
		// 	// document.dispatchEvent(evt);
		// 	window.postMessage({ type: 'GET_STATE' }, '*');
		//
    //   // This line is new!
    //   chrome.runtime.sendMessage({'type': 'SEND_STATE', 'state': { mystate: 5 } });
    // }
  }
);
