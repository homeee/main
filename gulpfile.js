"use strict";

var gulp            = require("gulp");
var sass            = require("gulp-sass");
var pug             = require("gulp-pug");
var autoprefixer    = require("gulp-autoprefixer");
var plumber         = require('gulp-plumber');
var browserSync     = require('browser-sync');
var gulpLoadPlugins = require('gulp-load-plugins'),
            plugins = gulpLoadPlugins();


                        /********default*********/  
                        
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

//преобразование svg в svg-sprite
gulp.task('svg', function() {
        return  gulp.src('./public/img/svg/*.svg')
            .pipe(plugins.svgmin({
                js2svg: {
                    pretty: true
                }
            }))
            .pipe( plugins.cheerio({
                run: function($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: { xmlMode: true }
            }))
            .pipe( plugins.replace('&gt;', '>'))
            .pipe( plugins.svgSprite({
                mode: {
                    symbol: {
                        sprite: "sprite.svg"
                    }
                }
            }))
            .pipe(gulp.dest('./public/img/'));
    });

//преобразование .js файлов из всех блоков в один main.js
gulp.task('js:copy',  function() {
    return gulp.src(['./source/**/*.js',])
        .pipe(plugins.concat('main.js'))
        .pipe(gulp.dest('./public/js/'))
        .pipe(browserSync.reload({stream: true}));
});

//слежение за файлами
gulp.task("public", ["browser-sync"], function() {
    gulp.watch(["./source/sass/main.sass", "./source/**/*.sass"], ["sass"]); 
    gulp.watch("./source/**/*.pug", ["pages"]);
    gulp.watch("./public/img/svg/*.svg", ["svg"]);
    gulp.watch(["./pubic/js/main.js", "./source/**/*.js"], ["js:copy"]);
    
});

gulp.task("watch", ["pages", "svg", "js:copy", "sass", "public"]); // дефолтный таск


                        /********build*********/
                        
//cобираем все CSS библиотеки в один файл 
gulp.task('libscss:build', function(){
    return gulp.src([
        'public/css/*.css',
    ])
        .pipe(plugins.concat('libs.min.css'))
        .pipe(plugins.cssnano())
        .pipe(gulp.dest('build/css/'))
});

//cобираем все js библиотеки в один файл 
gulp.task('libsJS:build', function() {
    return gulp.src(
        ['public/js/jquery-3.2.1.min.js',
        'public/js/*.js'], 
        ['node_modules/svg4everybody/dist/svg4everybody.min.js'] )
        .pipe(plugins.concat('libs.min.js'))
        .pipe(plugins.uglifyjs())
        .pipe(gulp.dest('build/js/'))
});

//копируем svg-sprite в папку build
gulp.task('svg:copy', function(){
    return gulp.src('./public/img/symbol/*.svg')
        .pipe(gulp.dest('./build/img/symbol/'));
});

//копируем index в папку build
gulp.task('index:copy', function(){  
    return gulp.src('./public/index.html')
        .pipe(gulp.dest('./build'));
});

//сжатие img и перемещение в папку build
gulp.task('img', function(){
    return gulp.src('./public/img/general/**/*.{png,jpg,gif}')
        .pipe(plugins.tinypng('api_key'))
        .pipe(gulp.dest('./build/img/'));
});
    
gulp.task("build", ["libscss:build", "libsJS:build", "index:copy" ,"svg:copy", "img"]); //таск build
