module.exports = function () {
    $.gulp.task('styles:build', () => {
        return $.gulp.src([
            'public/css/*.css',
        ])
            .pipe($.gp.concat('libs.min.css'))

            .pipe($.gp.cssnano())
            .pipe($.gulp.dest('./build/css/'))
    });

    $.gulp.task('styles:dev', () => {
        return $.gulp.src('./source/sass/main.sass')

            .pipe($.gp.sass())  // запускаем плагин
            .on('error', $.gp.notify.onError(function (error) {
                return {
                    title: 'sass',
                    message: error.message
                };
            }))

            .pipe($.gp.autoprefixer({
                browsers: ['last 3 version']
            }))

            .pipe($.gp.csso())
            .pipe($.gcmq())
            .pipe($.gp.csscomb())
            .pipe($.gulp.dest('./public/css/'))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });
};
