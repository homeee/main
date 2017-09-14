"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
var autoprefixer = require("gulp-autoprefixer");
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var cssnano = require('gulp-cssnano');
var concat	= require('gulp-concat');

global.$={
    gp: require('gulp-load-plugins')()
};

//преобразование css в sass
gulp.task("sass", function() {
    gulp.src("./source/sass/main.sass") // говорим какой файл взять
        .pipe(plumber())
        .pipe(sass())  // запускаем плагин
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest("./public/css/")) //задаем папку куда вставлять 
        .pipe(browserSync.reload({stream: true}));
});


//таск для работы со страницами
gulp.task("pages", function() {
    return gulp.src("./source/pages/*.pug")
        .pipe(pug({pretty: true}))  //с переносом pretty: true
        .pipe(gulp.dest("./public"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("browser-sync", function() {
    browserSync({
        server: {
            baseDir: "public"
        },
        open: true,
        notify: false
    })
});


gulp.task("watch", ["browser-sync"], function() {
    gulp.watch(["./source/sass/main.sass", "./source/**/*.sass"], ["sass"]); 
    gulp.watch("./source/**/*.pug", ["pages"]);
});

gulp.task("public", ["pages", "sass", "watch"]); // дефолтный 



/*
//преобразование svg в svg-sprite
module.exports = function() {
    $.gulp.task('svg', function() {
        return $.gulp.src('./public/img/!*.svg')
            .pipe($.gp.svgmin({
                js2svg: {
                    pretty: true
                }
            }))
            .pipe($.gp.cheerio({
                run: function($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: { xmlMode: true }
            }))
            .pipe($.gp.replace('&gt;', '>'))
            .pipe($.gp.svgSprite({
                mode: {
                    symbol: {
                        sprite: "sprite.svg"
                    }
                }
            }))
            .pipe($.gulp.dest('./public/img/svg/'));
    });
};


//cобираем все CSS библиотеки в один файл 
gulp.task('libscss', function(){
    return gulp.src([
        'publicc/css/!*.css',
    ])
        .pipe(concat('libs.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css/'))
});

//cобираем все js библиотеки в один файл 
gulp.task('libsjs', function(){
    return gulp.src([
        'app/js/!*.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest('build/js/'))
});

//копируем svg-sprite в папку build
$.gulp.task('svg:copy', function(){
    return $.gulp.src('./dev/static/img/general/!*.svg')
        .pipe($.gulp.dest('./build/img/svg/'));
});

//сжатие img и перемещение в папку build
$.gulp.task('img', function(){
    return $.gulp.src('./public/img/!**!/!*.{png,jpg,gif}')
        .pipe($.gp.tinypng(YOUR_API_KEY))
        .pipe($.gulp.dest('./build/static/img/'));
});

gulp.task("build", ["libscss", "libsjs", "svg:copy", "img"]); //таск build*/
