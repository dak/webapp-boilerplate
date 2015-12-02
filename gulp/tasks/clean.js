var gulp = require('gulp');
var setupConfig = require('../config');
var pi = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
});

gulp.task(function clean() {
    var config = setupConfig(process.env.NODE_ENV);

    return pi.del([config.dest], {
        dot: true
    });
});
