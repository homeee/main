module.exports = function() {
    $.gulp.task('pug', ()=>  {
        return $.gulp.src('./source/pages/**/*.pug')
            .pipe($.gp.pug({
                pretty: true
            }))
            .on('error', $.gp.notify.onError(function(error) {
                return {
                    title: 'Pug',
                    message: error.message
                };
            }))
            .pipe($.gulp.dest('./public/'))
            .on('end', $.browserSync.reload);
    });
};
