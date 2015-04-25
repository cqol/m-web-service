'use strict';

module.exports = {
	port: 3007	,
	apiPrefix: '/api/v1',
	log: {
		name: 'm-web-service',
		logdir: __dirname + '/../../logs/',
		duration: 86400000, // 1 day
		nameformat: '{pid}-YYYY-MM-DD[.log]'
	},
	hosts: {
		ucService: 'http://uc.taotaosou.com',
		appService: 'http://app.service.taotaosou.com'
	},
	redis: {
		port: 6379,
		host: 'localhost'
	},
	mysql: {
		cms: {
			host: '199.155.122.203',
			port: '3306',
			user: 'root',
			password: '123456',
			database: 'tts_taotaosou_cms',
			connectionLimit: 5
		}
	}
};
