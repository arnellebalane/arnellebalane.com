const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
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

gulp.task('build:images', () =>
    gulp.src('_site/**/*.{png,jpg,svg}')
        .pipe(imagemin([
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest('_site'))
);

gulp.task('build', gulp.series('build:css', 'build:images'));
