'use strict';

var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
	concat = require('gulp-concat');

var config = require('./config');

gulp.task('htmlmin', ['sass'], function () {
    var assets = useref.assets();

    var opts = {
        conditionals: true,
        loose: true
    };

    return gulp.src([
        config.src + 'output/maquette/**/*.html'
    ])
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss({compatibility: 'ie7,ie8,*,+units.rem'})))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(config.dist + 'portailDemo'));
});



gulp.task('vendorMinify', function() {
  gulp.src(
	[
		config.src + 'maquette/scripts/vendor/bootstrap.js',
		config.src + 'maquette/scripts/vendor/typeahead.jquery.min.js',
		config.src + 'maquette/scripts/vendor/jquery.placeholder.js',
		config.src + 'maquette/scripts/vendor/select2.js'

	]
  )
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.src + 'output/portailDemo/js'))
});
