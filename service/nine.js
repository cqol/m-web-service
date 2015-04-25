'use strict';

var request = require('co-urllib').request,
	log = require('../util/log');

exports.detail = function * () {
	var ctx = this,
		itemId = parseInt(ctx.params.id) || 0;

	if (itemId <= 0) {
		return ctx.throw(404);
	}
	var res = yield request('http://99.app.taotaosou.com' + '/mobileDetail.do', {
		data: {
			id: itemId
		},
		dataType: 'json'
	});

	if (!res.data.sales) {
		return ctx.throw(404);
	}

	var viewData = {
		title: res.data.sales.title,
		disc: '超级9块9，优质折扣商品推荐网站，每日精选数款折扣商品，独家优惠，低至9.9元，全场包邮，精选商家，样品人工验货质检，确保质量，更有每日0元秒杀，限量疯抢。超级9.9，超级便宜！',
		keywords: '超级9块9，超级九块九，9块9包邮，九块邮，超值折扣，超级折扣，打折，特价，0元秒杀'
	};


	try {
		viewData.product = res.data.sales;
	} catch (e) {
		log.error(e);
	}

	yield ctx.render('nine_detail', viewData);
};

