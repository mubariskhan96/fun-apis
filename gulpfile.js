const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const copy = require('copy');

gulp.task('clean', () => del('dist/**', { force: true }));

gulp.task('copy', () =>
  copy('*.json', 'dist', (err) => {
    if (err) throw err;
  }));

gulp.task('build', () =>
  gulp.src(['**/*.js', 'bin/*', 'app.js', '!node_modules/**', '**/public/uploads'])
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest('dist')));


    gulp.task('default', ['clean', 'copy', 'build']);