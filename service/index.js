'use strict';

/**
 * 首页
 */
exports.page = function * () {
	var ctx = this;

	var viewData = {
		title: '淘淘搜 - 找同款，比价格',
		keywords: '淘淘搜、比价、同款、促销、团购、同款比价、问答、帮帮、帮我找、传图找商品',
		disc: '淘淘搜是目前国内领先的同款比价、购物分享社区。精选商品，促销不断，还有传图找商品的特色服务，支持全网比价，时尚不败家。更有比价插件和APP，时尚优惠随时随地，原来找同款、比价格可以这么轻松。',
		setting_url: '/user/info',
		link: {
			category: '/categories',
			dapei: '/albums',
			tuan: '/tuan',
			promotion: '/tejia'
		},
		dtd:new Date().getTime()
	};

	yield ctx.render('index', viewData);
};
