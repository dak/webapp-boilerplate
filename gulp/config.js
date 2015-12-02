var gulp = require('gulp');
var fs = require('fs');
var project = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

module.exports = function(env) {
    var config = {
        env: env || 'production',
        src: 'src',
        dest: (env === 'development' ? 'dev' : 'dist'),
        browsers: [
            'last 2 versions',
            'not ie < 12'
        ],
        version: project.version,
        license: project.license
    };

    return config;
};
