'use strict';

var logstream = require('logfilestream'),
	config = require('../config');

var levels = ['info', 'error'],
	nameformat = config.log.nameformat,
	env = process.env.NODE_ENV || 'develop';

function now() {
	var d = new Date();
	return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' +
		d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
}

levels.forEach(function(level) {
	if (env === 'develop') {

		exports[level] = function() {
			for (var i = 0, l = arguments.length; i < l; i++) {
				console.log(arguments[i]);
				if (arguments[i] instanceof Error) {
					console.log(arguments[i].stack);
				}
			}
		};
		return;
	}

	var options = config.log;
	options.nameformat = '[' + config.log.name + ']-[' + level + ']-' + nameformat;
	var stream = logstream(options);

	exports[level] = function() {
		stream.write(now());
		for (var i = 0, l = arguments.length; i < l; i++) {
			stream.write('\n');
			stream.write(arguments[i]);
			if (arguments[i] instanceof Error) {
				stream.write('\n');
				stream.write(arguments[i].message);
				stream.write('\n');
				stream.write(arguments[i].stack);
			}
		}
		stream.write('\n\n\n');
	};
});
