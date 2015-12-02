var gulp = require('gulp');
var setupConfig = require('../config');
var pi = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
});

function scsslint() {
    var config = setupConfig(process.env.NODE_ENV);

    return gulp.src([config.src + '/**/*.scss'], {
            since: gulp.lastRun('scsslint')
        })
        .pipe(pi.scssLint({
            config: 'gulp/.scss-lint.yml'
        }));
}

function compileStyles() {
    var config = setupConfig(process.env.NODE_ENV);

    return gulp.src(config.src + '/**/*.scss', {
            since: gulp.lastRun('styles')
        })
        .pipe(pi.if(config.env !== 'production', pi.sourcemaps.init()))
        .pipe(pi.sass({
            includePaths: [
                './styles',
                './src/styles'
            ]
        }))
        .pipe(pi.autoprefixer(config.browsers))
        .pipe(pi.if(config.env === 'production', pi.minifyCss()))
        .pipe(pi.if(config.env !== 'production', pi.sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: './'
        })))
        .pipe(gulp.dest(config.dest));
}

gulp.task(scsslint);
gulp.task(compileStyles);

gulp.task('styles', gulp.series(
    scsslint,
    compileStyles
));

gulp.task('styles:watch', function() {
    var config = setupConfig(process.env.NODE_ENV);
    gulp.watch(config.src + '/**/*.scss', gulp.series(
        scsslint,
        compileStyles
    ));
});
