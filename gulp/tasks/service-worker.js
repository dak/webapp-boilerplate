var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var setupConfig = require('../config');
var swPrecache = require('sw-precache');

// This is used as the cacheID, worth only reading the file once.
var packageName = JSON.parse(fs.readFileSync('./package.json', 'utf8')).name;

const shellFiles = [
    '/**/*.html',
    '/manifest.json',
    '/images/*.{png,jpg,jpeg,gif,svg}',
    '/images/favicons/*.{png,jpg,jpeg,gif,svg}',
    
    // Bundles Dependencies
    '/dependencies.js',

    // Application Shell
    '/app/components/shell/**/*.{js,css}',

    // 404 Page
    '/app/pages/404/**/*.{js,css}'
];

function precache() {
    var config = setupConfig(process.env.NODE_ENV);

    return swPrecache.write(path.join(config.dest, 'sw.js'), {
        staticFileGlobs: shellFiles.map(function (path) { return config.dest + path; }),
        stripPrefix: config.dest,
        navigateFallback: '/404',
        cacheId: packageName
    });
}

gulp.task(precache);

gulp.task('precache:watch', function() {
    var config = setupConfig(process.env.NODE_ENV);
    gulp.watch(shellFiles.map(function (path) {
        return config.dest + path;
    }), {usePolling: true}, precache);
});
