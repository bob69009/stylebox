'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync');

var config = require('./config');

gulp.task('build', ['clean'], function() {
    gulp.start('dist');
});

gulp.task('dist', [
    'extend',
    'copy',
    'sass',
    'copyIndex',
    'copyFonts',
    'copyImages',
    'copyJS',
    'copyDoc',
    'copyTemplate',
    'copyStyles',
    'copyDocroot',
    'copyGabarit',
    'vendorMinify',
    'copyScripts',
    'extendToolbox',
    'extendMaquette',
    'extendGabarit',
    'imagemin',
    'toolbox-watch'
]);


// serve the dist folder after generation to test it
gulp.task('serve-dist', ['build'], function() {
    browserSync({
        notify: false,
        port: config.port,
        open: false,
        server: {
            baseDir: [config.dist]
        }
    });
});
