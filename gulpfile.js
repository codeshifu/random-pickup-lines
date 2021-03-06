const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const runSequence = require('run-sequence');
const workboxBuild = require('workbox-build');
const minify = require('gulp-minify');
const ghPages = require('gulp-gh-pages');
const babel = require('gulp-babel');
const gulpWebpack = require('webpack-stream');

gulp.task('clean', () => del(['!app/dist/idb.js', '!app/dist/idb-min.js']));

gulp.task('deploy', () => gulp.src('app/**/*').pipe(ghPages()));

gulp.task('css', cb =>
  gulp
    .src('app/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('app/dist/css'))
);

gulp.task('js', cb =>
  gulp
    .src(['app/js/*.js', '!app/js/idb.js', '!app/js/sw.js'])
    .pipe(gulpWebpack(require('./webpack.config')))
    .pipe(minify())
    .pipe(gulp.dest('app/dist/js'))
);

gulp.task('sw', () =>
  workboxBuild.injectManifest({
    swSrc: 'app/js/sw.js',
    swDest: 'app/sw.js',
    globDirectory: 'app',
    globPatterns: [
      'index.html',
      'dist/css/style.css',
      'dist/js/idb.js',
      'dist/js/main-min.js',
      'images/**/*.*',
      'manifest.json'
    ]
  })
);

gulp.task('default', cb => {
  console.log('runninng default task...');
  runSequence('clean', 'css', 'js', 'sw', cb);
});

gulp.task('serve', ['default'], () => {
  browserSync.init({
    server: 'app/',
    port: 1234
  });

  gulp.watch('app/*.html').on('change', browserSync.reload);
  gulp
    .watch(['app/css/*.css', 'app/js/*.js', '!app/js/idb.js'], ['default'])
    .on('change', browserSync.reload);
});
