'use strict';

var path = require('path'),
	fs = require('fs');
var helpers = [];
/*var files = fs.readdirSync(path.resolve(__dirname, '../hbs_helpers')),
	helpers = [];

files.forEach(function(file) {
	if (file.endsWith('.js')) {
		file = path.basename(file);
		file = file.slice(0, file.length - 3);
		helpers.push(file);
	}
});*/

var webName = {
	'taobao': '淘宝',
	'tmall': '天猫'
}

let comparatorHelpers = {
	imgCDN: function (width, height, url) {
		return url + '_' + width + 'x' + height + '.jpg';
	},
	webSource: function (name) {
		return webName[name];
	}
}
module.exports = function(hbs) {
	var k;
	for (k in comparatorHelpers) {
		if (comparatorHelpers.hasOwnProperty(k)) {
			hbs.registerHelper(k, comparatorHelpers[k]);
		}
	}

	helpers.forEach(function(helper) {
		var m = require('../hbs_helpers/' + helper);
		hbs.registerHelper(helper.toLowerCase(), m);
	});
};
