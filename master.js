'use strict';

var cluster = require('cluster'),
	//cpus = require('os').cpus().length,
	cpus = 4,
	restarts = [],
	log = require('./util/log');


cluster.setupMaster({
	exec: 'worker.js'
});

for (var i = 0; i < cpus; i++) {
	cluster.fork();
}

cluster.on('exit', function(worker, code, signal) {
	log.error('worker ' + worker.process.pid + ' died (' + (signal || code) + '), restarting...');
	if (!giveup()) {
		cluster.fork();
	}
});

function giveup() {
	var length = restarts.push(Date.now()),
		limit = 9,
		during = 60000; // 1 min

	if (length > limit) {
		restarts = restarts.slice(-limit);
	}
	var span = restarts[restarts.length - 1] - restarts[0];
	var warning = (restarts.length >= limit) && (span < during);

	if (warning) {
		log.error('die ' + limit + ' times in ' + span + ' ms.');
	}

	return warning;
}
