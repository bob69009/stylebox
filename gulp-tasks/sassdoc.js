'use strict';

var gulp = require('gulp'),
    sassdoc = require('sassdoc'),
    config = require('./config');

gulp.task('sassdoc', function () {
    var options = {
        dest: config.doc + 'sassdoc',
    };

    return gulp.src(config.src + 'styles/**/*.scss')
        .pipe(sassdoc(options));
});