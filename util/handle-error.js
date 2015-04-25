'use strict';

var log = require('./log');

/*
 * @param {object} - error
 * @param {object} - context of koa app
 */
module.exports = function * (error, ctx) {
	if (ctx.path.indexOf('api') === -1) {
		// page
		if (error.status === 404) {
			yield ctx.render('404', {
				title: '404'
			});
			return;
		}

		log.error(error);

		ctx.status = 500;
		yield ctx.render('500', {
			title: '500'
		});

		return;
	}

	// api (todo: jsonp)
	if (error.status === 400) {
		ctx.status = 400;
		ctx.body = {
			message: error.message
		};
		return;
	}
	if (error.status === 404) {
		ctx.status = 404;
		ctx.body = {
			message: 'not found'
		};
		return;
	}

	ctx.status = 500;
	ctx.body = {
		message: 'server error'
	};

	log.error(error);
};
