'use strict';

var nine = require('./service/nine'),
	topic = require('./service/topic'),
	config = require('./config');

module.exports = function(app) {
	//添加路由
	app.get('/detail', function * () {
		var viewData = {
			title: 'detail',
			keywords: 'keywords',
			disc: 'disc'
		};
		yield this.render('detail' , viewData);
	});
	app.get('/', function * () {
		yield this.render('index');
	});
};
