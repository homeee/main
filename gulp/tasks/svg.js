module.exports = function() {
    $.gulp.task('svg-icon', () => {
        return $.gulp.src('./public/img/svg-icon/*.svg')
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
                        sprite: "sprite-icon.svg"
                    }
                }
            }))
            .pipe($.gulp.dest('./public/img/'));
    });
    $.gulp.task('svg-img', () => {
        return $.gulp.src('./public/img/svg-img/*.svg')
            .pipe($.gp.svgmin({
                js2svg: {
                    pretty: true
                }
            }))
            .pipe($.gp.cheerio({
                run: function($) {

                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: { xmlMode: true }
            }))
            .pipe($.gp.replace('&gt;', '>'))
            .pipe($.gp.svgSprite({
                mode: {
                    symbol: {
                        sprite: "sprite-img.svg"
                    }
                }
            }))
            .pipe($.gulp.dest('./public/img/'));
    });
};
