'use strict';

var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	jshint = require('gulp-jshint');


gulp.task('nodemon', function() {
	nodemon({
		script: 'master.js',
		env: {
			'NODE_ENV': 'develop'
		},
		nodeArgs: ['--harmony'],
		options: '-e js -i test/*.js'
	});
});

gulp.task('jshint', function() {
	return gulp.src(['*.js', '**/*.js']).pipe(jshint()).pipe(jshint.reporter());
});
