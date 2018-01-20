module.exports = function() {
    $.gulp.task('fonts', () => {
        return $.gulp.src('./public/fonts/**/*.{ttf,woff,eot}')
            .pipe($.gulp.dest('./build/fonts/'));
    });
    $.gulp.task('index', () => {
        return $.gulp.src('./public/*.html')
            .pipe($.gulp.dest('./build'));
    });
    $.gulp.task('php', () => {
        return $.gulp.src('./public/php/*.php')
            .pipe($.gulp.dest('./build/php'));
    });
};
