global.$ = {
    path: {
        task: require('./gulp/paths/tasks.js')
    },
    gulp: require('gulp'),
    browserSync: require('browser-sync').create(),
    gcmq: require("gulp-group-css-media-queries"),
    gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
    require(taskPath)();
});

$.gulp.task('watch', $.gulp.series(
    $.gulp.parallel('styles:dev', 'pug', 'js:dev', 'svg-icon', 'svg-img'),
    $.gulp.parallel(
        'dev',
        'serve'
    )
));


$.gulp.task('build', $.gulp.series(
    $.gulp.parallel('styles:build', 'js:build', 'svg:build', 'img:build', 'fonts', 'index' , 'php')));

