module.exports = function () {
    $.gulp.task('dev', function () {
        $.gulp.watch('./source/**/*.pug', $.gulp.series('pug'));
        $.gulp.watch(["./source/sass/main.sass", "./source/**/*.sass"], $.gulp.series('styles:dev'));
        $.gulp.watch('./source/img/svg-icon/*.svg"', $.gulp.series('svg-icon'));
        $.gulp.watch('./source/img/svg-img/*.svg"', $.gulp.series('svg-img'));
        $.gulp.watch(["./pubic/js/*.js", "./source/**/*.js"], $.gulp.series('js:dev'));

    });
};