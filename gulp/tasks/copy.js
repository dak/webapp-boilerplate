var gulp = require('gulp');
var setupConfig = require('../config');
var pi = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
});

function copy() {
    var config = setupConfig(process.env.NODE_ENV);

    return gulp.src([
            config.src + '/*.{json,txt,ico}',
            'jspm_packages/system.js'
        ], {
            since: gulp.lastRun('copy')
        })
        .pipe(gulp.dest(config.dest));
}

gulp.task(copy);

gulp.task('copy:watch', function() {
    var config = setupConfig(process.env.NODE_ENV);
    gulp.watch(config.src + '/*.{json,txt,ico}', copy);
});
