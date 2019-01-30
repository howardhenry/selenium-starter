const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('eslint', () => {
  return gulp.src(['./tests/**/*.js', './gulpfile.js'])
    .pipe(eslint())
    .pipe(eslint.format(''))
    .pipe(eslint.failAfterError());
});
