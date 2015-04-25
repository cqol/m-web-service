'use strict';

var nine = require('./service/nine'),
	topic = require('./service/topic'),
	config = require('./config');

module.exports = function(app) {
  // 超级九块九详情页
	app.get('/nine/:id', nine.detail);
	app.get('/chi/:id', topic.mugo);
};
