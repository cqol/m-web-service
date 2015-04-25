'use strict';

module.exports = {
	port: 3003,
	apiPrefix: '/api/v1',
	log: {
		name: 'm-chaoji99-service',
		logdir: __dirname + '/../../logs/',
		duration: 86400000, // 1 day
		nameformat: '{pid}-YYYY-MM-DD[.log]'
	},
	hosts: {
		search: 'http://10.0.0.158:8099/s/',
		ucService: 'http://uc.taotaosou.com',
		appService: 'http://app.service.taotaosou.com',
		findService: 'http://service1.taotaosou.com'
	},
	redis: {
		port: 6379,
		host: 'localhost' // 192.168.3.21
	},
	mysql: {
		five: {
			host: '10.0.0.134',
			port: '3306',
			user: 'vvlcardi',
			password: 'VGO112a1ZBye',
			database: 'tts_taotaosou_five',
			connectionLimit: 5
		},
		find: {
			host: '10.0.0.134',
			port: '3306',
			user: 'vvlcardi',
			password: 'VGO112a1ZBye',
			database: 'tts_taotaosou_find',
			connectionLimit: 5
		},
		cms: {
			host: '10.0.0.134',
			port: '3306',
			user: 'vvlcardi',
			password: 'VGO112a1ZBye',
			database: 'tts_taotaosou_cms',
			connectionLimit: 5
		}
	}
};
