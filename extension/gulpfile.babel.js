const gulp = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const webpack = require('webpack');
const rimraf = require('rimraf');

const plugins = loadPlugins();

const popupWebpackConfig = require('./popup/webpack.config');
const backgroundWebpackConfig = require('./background/webpack.config');
// const contentWebpackConfig require('./content/webpack.config';

gulp.task('popup-js', (cb) => {
    webpack(popupWebpackConfig, (err, stats) => {
        if (err) throw new plugins.util.PluginError('webpack', err);

        plugins.util.log('[webpack]', stats.toString());

        cb();
    });
});

gulp.task('background-js', (cb) => {
    webpack(backgroundWebpackConfig, (err, stats) => {
        if (err) throw new plugins.util.PluginError('webpack', err);

        plugins.util.log('[webpack]', stats.toString());

        cb();
    });
});

// gulp.task('content-js', ['clean'], (cb) => {
//   webpack(contentWebpackConfig, (err, stats) => {
//     if(err) throw new plugins.util.PluginError('webpack', err);

//     plugins.util.log('[webpack]', stats.toString());

//     cb();
//   });
// });

gulp.task('popup-html', () => {
    return gulp.src('popup/src/index.html')
        .pipe(plugins.rename('popup.html'))
        .pipe(gulp.dest('./build'))
});

gulp.task('copy-manifest', () => {
    return gulp.src('manifest.json')
        .pipe(gulp.dest('./build'));
});

gulp.task('clean', (cb) => {
    rimraf('./build', cb);
});

gulp.task('build', gulp.series('copy-manifest', 'popup-js', 'popup-html', 'background-js')); // , 'content-js'

gulp.task('watch', () => {
    gulp.watch('popup/**/*', ['build']);
    // gulp.watch('content/**/*', ['build']);
    gulp.watch('background/**/*', ['build']);
});

gulp.task('default', gulp.series('build'));


