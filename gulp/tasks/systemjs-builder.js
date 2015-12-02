var path = require('path');
var gulp = require('gulp');
var setupConfig = require('../config');
var Builder = require('systemjs-builder');

function systemjs() {
    var config = setupConfig(process.env.NODE_ENV);
    var builder = new Builder('./', path.join(config.dest, '/app/config.js'));
    var appPath = path.join(config.dest, '/app/**/*');
    var dependencies = `${appPath} - [${appPath}]`;
    var output = path.join(config.dest, '/dependencies.js');

    builder.config({
        paths: {
            '~/*': config.dest + '/app/*.js',
            'github:*': 'jspm_packages/github/*',
            'npm:*': 'jspm_packages/npm/*'
        }
    });

    return builder.bundle(dependencies, output, {
        minify: (config.env === 'production'),
        sourceMaps: (config.env !== 'production')
    })
    .catch (function(err) {
        console.log('SystemJS Build error');
        console.log(err);
    });
}

gulp.task(systemjs);

gulp.task('systemjs:watch', function() {
    var config = setupConfig(process.env.NODE_ENV);
    gulp.watch('./jspm_packages/**/*', {
        usePolling: true
    }, systemjs);
});
