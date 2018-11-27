'use strict';

var gulp = require('gulp');

var config = require('./config');

gulp.task('copy', function () {
    return gulp.src(config.src + 'portailDemo/fonts/**/*')
        .pipe(gulp.dest(config.dist + 'portailDemo/fonts' ));
});

gulp.task('copyFonts', function () {
    return gulp.src(config.src + 'portailDemo/fonts/**/*')
        .pipe(gulp.dest(config.src + 'output/portailDemo/fonts' ));
});

gulp.task('copyIndex', function () {
    return gulp.src(config.src + '*.html')
        .pipe(gulp.dest(config.src + 'output/' ));
});

gulp.task('copyImages', function () {
    return gulp.src(config.src + config.img + '**/*')
        .pipe(gulp.dest(config.src + 'output/portailDemo/images'));
});

gulp.task('copyGabarit', function () {
    return gulp.src(config.src + 'gabarit/**/*')
        .pipe(gulp.dest(config.src + 'output/gabarit'));
});

gulp.task('copyJS', function () {
    return gulp.src(config.src + 'portailDemo/js/**/*')
        .pipe(gulp.dest(config.src + 'output/portailDemo/js'));
});

gulp.task('copyDoc', function () {
    return gulp.src(config.src + 'portailDemo/doc/**/*')
        .pipe(gulp.dest(config.src + 'output/portailDemo/doc'));
});

gulp.task('copyToolbox', function () {
    return gulp.src(config.src + 'portailDemo/toolbox/**/*')
        .pipe(gulp.dest(config.src + 'output/portailDemo/toolbox'));
});

gulp.task('copyTemplate', function () {
    return gulp.src(config.src + 'toolbox/**/*')
        .pipe(gulp.dest(config.src + 'output/toolbox'));
});

gulp.task('copyStyles', function () {
    return gulp.src([ config.src + 'portailDemo/css/**/*' ])
        .pipe(gulp.dest(config.src + 'output/portailDemo/css'));
});
gulp.task('copyMaquette', function () {
    return gulp.src([ config.src + 'maquette/**/*' ])
        .pipe(gulp.dest(config.src + 'output/maquette/'));
});

gulp.task('copyScripts', function () {
    return gulp.src([ config.src + 'maquette/scripts/**/*' ])
        .pipe(gulp.dest(config.src + 'output/maquette/scripts'));
});


gulp.task('copyDocroot', function () {
    return gulp.src([ 
            config.src + 'maquette/docroot/**/*'
    ])
        .pipe(gulp.dest(config.src + 'output/maquette/docroot'));
});