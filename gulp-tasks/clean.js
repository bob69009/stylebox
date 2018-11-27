'use strict';

var gulp = require('gulp'),
    del = require('del');

var config = require('./config');

gulp.task('clean', function () {
    return del([
        config.src + 'output/*.html',
        config.src + 'output/gabarit',
        config.src + 'output/maquette',
        config.src + 'output/toolbox',
        config.src + 'output/portailDemo',
		config.src + 'output/',
		config.dist,
    ], {force: true});
});


gulp.task('clean:output', function () {
    return del([
        config.src + 'output/portailDemo/*.html',
    ], {force: true});
});

gulp.task('clean:maquette', function () {
    return del([
        config.src + 'output/maquette/**/*.html',
    ], {force: true});
});

gulp.task('clean:component', function () {
    return del([
        config.src + 'output/portailDemo/toolbox/**/*.html',
    ], {force: true});
});

