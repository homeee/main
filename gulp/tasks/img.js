module.exports = function() {

    $.gulp.task('img:build', () => {
        return $.gulp.src('./public/img/general/**/*.{png,jpg,gif}')
            .pipe($.gp.tinypng('uvcWUMZgE7KYRaeNS1O27mla6kFg_ihU'))
            .pipe($.gulp.dest('./build/img/'));
    });


    $.gulp.task('svg:build', () => {
        return $.gulp.src('./public/img/symbol/*.svg')
            .pipe($.gulp.dest('./build/img/symbol/'));
    });
};
