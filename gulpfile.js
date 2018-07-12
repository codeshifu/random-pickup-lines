const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const runSequence = require('run-sequence');
const workboxBuild = require('workbox-build');
const minify = require('gulp-minify');

gulp.task('clean', () => del(['app/dist/*']));

gulp.task('css', cb =>
  gulp
    .src('app/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('app/dist/css'))
);

gulp.task('js', cb =>
  gulp
    .src('app/js/*.js')
    .pipe(minify({}))
    .pipe(gulp.dest('app/dist/js'))
);

gulp.task('default', cb => {
  console.log('runninng default task...');
  runSequence('clean', 'css', 'js', cb);
});

gulp.task('serve', ['default'], () => {
  browserSync.init({
    server: 'app/',
    port: 3000
  });

  gulp.watch('app/*.html').on('change', browserSync.reload);
  gulp
    .watch(['app/css/*.css', 'app/js/*.js'], ['default'])
    .on('change', browserSync.reload);
});
