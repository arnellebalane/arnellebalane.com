const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

gulp.task('build:css', () =>
    gulp.src('_site/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
            autoprefixer({browsers: ['last 1 versions']}),
            cssnano()
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('_site'))
);

gulp.task('build', gulp.series('build:css'));
