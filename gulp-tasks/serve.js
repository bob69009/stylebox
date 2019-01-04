'use strict';

var gulp = require('gulp'),
    del = require('del'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    firstshow = true;


var extender = require('gulp-html-extend');

var config = require('./config.json');

gulp.task('extend', ['clean:output'], function () {
    gulp.src(
        config.src + 'portailDemo/*.html'
    )
        .pipe(extender({annotations:true,verbose:false})) // default options
        .pipe(gulp.dest(config.src + 'output/portailDemo' ))

})

gulp.task('extendToolbox', ['clean:component'], function () {
    gulp.src(
        config.src + 'portailDemo/toolbox/**/*.html'
    )
        .pipe(extender({annotations:true,verbose:false})) // default options
        .pipe(gulp.dest(config.src + 'output/portailDemo/toolbox/' ))

})


gulp.task('extendMaquette',['copyMaquette'],  function () {
    gulp.src(
        config.src + 'maquette/**/*.html'
    )
        .pipe(extender({annotations:true,verbose:false})) // default options
        .pipe(gulp.dest(config.src + 'output/maquette/' ))

})

gulp.task('extendGabarit',['copyGabarit'],  function () {
    gulp.src(
        config.src + 'gabarit/*.html'
    )
        .pipe(extender({annotations:true,verbose:false})) // default options
        .pipe(gulp.dest(config.src + 'output/gabarit/' ))

})


gulp.task('serve', ['sass'], function() {
    browserSync({
        notify: false,
        port: config.port,
        open: true,
        server: {
            baseDir: [ config.src ]
        }/*,
        ghostMode: false*/
    });

    gulp.watch([
        config.src + '**/*.html',
        config.src + 'maquette/scripts/**/*.js',
        config.src + config.img + '**/*',
        config.src + 'fonts/**/*'
    ]).on('change', reload);


    gulp.watch([
        config.src + 'styles/**/*.scss'
    ], ['sass']);



});

/*Tache permettant le premier chargement après lancement serve*/
gulp.task('toolbox-watch',function(){
 if(firstshow){
   del([
       config.src + 'output/portailDemo/toolbox/**/*.html',
   ], {force: true});
   gulp.src(
       config.src + 'portailDemo/toolbox/**/*.html'
   )
       .pipe(extender({annotations:true,verbose:false})) // default options
       .pipe(gulp.dest(config.src + 'output/portailDemo/toolbox/' ))

   firstshow = false;
 }
});

gulp.task('servetool', ['extend', 'extendToolbox', 'extendMaquette', 'sass','copyIndex','copyFonts','copyImages','copyJS','copyDoc','copyTemplate','copyStyles', 'copyDocroot','copyGabarit', 'vendorMinify', 'copyScripts', 'extendGabarit'], function() {
    browserSync({
        notify: false,
        port: config.port,
        open: true,
        server: {
            baseDir: [ config.src + "output/"  ],
            routes: {
                '/bower_components': "bower_components"
            }
        }
    });

    // auto reload if change in app/
    gulp.watch([
        config.src + 'output/**/*.html',
        config.src + 'output/maquette/scripts/**/*.js',
        config.src + 'output/' + config.img + '**/*',
        config.src + 'output/portailDemo/fonts/**/*'
    ]);

    gulp.watch([
        config.src + 'portailDemo/*.html'
    ], ['extend']);

    gulp.watch([
        config.src + 'portailDemo/toolbox/**/*.html'
    ]);

    gulp.watch([
         config.src + 'maquette/scripts/**/*.js',
         config.src + 'maquette/*.html'
    ], ['extendMaquette']);

     gulp.watch([
        config.src + 'gabarit/*.html'
    ], ['extendGabarit']);

    gulp.watch([
        config.src + 'styles/**/*.scss'
    ], ['sass']);

    gulp.watch([
        config.src + 'portailDemo/css/**/*.css'
    ], ['copyStyles']).on('change', reload);

    gulp.watch('bower.json', ['wiredep']);
});
