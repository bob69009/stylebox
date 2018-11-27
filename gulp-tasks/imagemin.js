'use strict';

var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

var config = require('./config');

gulp.task('imagemin', function () {
    return gulp.src(config.src + config.img + '**/*')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.dist + config.img));
});