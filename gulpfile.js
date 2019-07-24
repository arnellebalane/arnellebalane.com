const gulp = require('gulp');
const cssnano = require('gulp-cssnano');

gulp.task('build:css', () => {
    return gulp.src('_site/**/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('_site'));
});

gulp.task('build', gulp.parallel(
    'build:css'
));
