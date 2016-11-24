var gulp = require('gulp');
var gulpMocha = require('gulp-mocha');
var gulpUtils = require('gulp-util');
var eslint = require('gulp-eslint');

gulp.task('default', ['mocha', 'lint'], function () {
  gulp.watch(['server/**', 'test/**']);
});

gulp.task('mocha', function () {
  return gulp.src(['test/*.js'], {read: false})
    .pipe(gulpMocha({reporter: 'list'}))
    .on('error', gulpUtils.log);
});

gulp.task('lint', function () {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint.format());
});
