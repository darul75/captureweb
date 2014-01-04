var page = require('webpage').create();
var args = require('system').args;

var url = args[1];
var filename = args[2];
var viewportSize = args[3];

console.log(url);

if (viewportSize) {
	page.viewportSize = {
		width : viewportSize.split(' ')[0],
		height : viewportSize.split(' ')[1]
	};
}

// page.viewportSize = {
//   width : 480, height : 800
// }

// var timeout = args[3];
// var cut = args[4] == 'true';
// var cookie = args[5];

// if (true) page.clipRect = {
//	top: 0,
//	left: 0,
//	width: 480,
//	height: 800
// }

// page.scrollPosition = {
//   top: 100,
//   left: 0
// };

page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36';
//page.navigationLocked = true;

page.open(url, function(status) {
	if (status !== 'success') throw 'Unable to load';
	window.setTimeout(function () {
		// page.render(filename);
		// // write output
		// //var b64 = page.renderBase64('PNG');
		// //console.log(b64);
		// phantom.exit();
	}, 3000);
});

//if (cookie) phantom.addCookie(JSON.parse(cookie))

// silence phantomjs
page.onConsoleMessage = function () {};
page.onConfirm = function () {};
page.onPrompt = function () {};
page.onError = function () {};
page.onLoadFinished = function() {
	window.setTimeout(function () {
		page.render(filename);
		// write output
		//var b64 = page.renderBase64('PNG');
		//console.log(b64);
		phantom.exit();
	}, 3000);	
};
