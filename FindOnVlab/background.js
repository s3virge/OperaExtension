chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.query({
		currentWindow: true,
		active: true
	}, function(tab) {
		chrome.tabs.create({
			"url": "https://www.google.com.ua/search?q=bios+site:vlab.su&gws_rd=ssl"
		});
	});
});
