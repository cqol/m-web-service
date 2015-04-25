'use strict';

var uniqueManifest = require('koa-unique-manifest'),
	handleError = require('./util/handle-error'),
	staticCache = require('koa-static-cache'),
	cache = require('koa-redis-cache'),
	logger = require('koa-logger'),
	router = require('koa-router'),
	jsonp = require('koa-jsonp'),
	fresh = require('koa-fresh'),
	config = require('./config'),
	apiPrefix = config.apiPrefix,
	log = require('./util/log'),
	etag = require('koa-etag'),
	hbs = require('koa-hbs'),
	path = require('path'),
	koa = require('koa'),
	app = koa();

var ENV = process.env.NODE_ENV;

/*
 * global error handle
 */
app.use(function * (next) {
	try {
		yield * next;

		// 404 - 临时处理，所有服务上线后取消
		if (!this.body && this.status === 404) {
			this.throw(404);
		}
	} catch (e) {
		yield handleError(e, this);
	}
});

/*
 * view engine: hbs
 */
app.use(hbs.middleware({
	viewPath: __dirname + '/hbs',
	partialsPath: __dirname + '/hbs/shared'
}));
require('./util/hbs-helper')(hbs);

/*
 * request: gzip() -> fresh() -> etag
 * response: etag() -> fresh() -> gzip()
 */
// app.use(gzip()); // nginx will do this
app.use(fresh());
app.use(etag());

if (ENV !== 'production') {
	app.use(logger());
	app.use(uniqueManifest());
}
app.use(staticCache({
	dir: path.resolve(__dirname, 'static')
}));

if (ENV === 'production') {
	app.use(cache({
		prefix: 'tts-mobile',
		expire: 60 * 60, // 1h
		passParam: 'cache',
		routes: [{
			path: '/tuan',
			expire: 300
		}, {
			path: '/tuan/:id',
			expire: 300
		}, {
			path: apiPrefix + '/tuan/products',
			expire: 300
		},
			'/bijia', '/list',
			'/items/:id', '/find/:id',
			'/categories', '/categories/:id',
			'/search/same', '/search/similar', '/search/text',
			'/albums', '/albums/:id', '/feeds/:id', '/weibo/albums/:id'
		],
		redis: config.redis,
		onerror: function(error) {
			log.error(error);
		}
	}));
}

/*
 * route
 */
app.use(jsonp());
app.use(router(app));
var route = require('./route');
route(app);

/*
 * error: should never trigger
 */
app.on('error', function(error, context) {
	log.error(error, context);
});

app.listen(config.port);
log.info('server start on port: ' + config.port);
