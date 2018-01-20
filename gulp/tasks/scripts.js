module.exports = function() {
    $.gulp.task('js:build', () => {
        return $.gulp.src(
            ['public/js/jquery-3.2.1.min.js',
                'public/js/bootstrap.min.js',
                'public/js/main.js',
                'public/js/jquery-ui.min.js'],
            ['node_modules/svg4everybody/dist/svg4everybody.min.js'])
            .pipe($.gp.concat('libs.min.js'))
            .pipe($.gp.uglifyjs())
            .pipe($.gulp.dest('./build/js/'));
    });

    $.gulp.task('js:dev', () => {
        return $.gulp.src(['./source/**/*.js',
                            ])
            .pipe($.gp.concat('main.js'))
            .pipe($.gulp.dest('./public/js/'))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });
};
