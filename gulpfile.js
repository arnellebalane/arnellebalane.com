const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const imageminJpegOptim = require('imagemin-jpegoptim');

gulp.task('build:html', () => {
    return gulp.src('_site/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('_site'));
});

gulp.task('build:js', () => {
    return gulp.src('_site/**/*.{js,mjs}')
        .pipe(terser())
        .pipe(gulp.dest('_site'));
});

gulp.task('build:css', () => {
    return gulp.src('_site/**/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('_site'));
});

gulp.task('build:images', () => {
    return gulp.src('_site/**/*.{jpg,svg}')
        .pipe(imagemin([
            imageminJpegOptim({
                progressive: true,
                max: 80
            }),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest('_site'));
});

gulp.task('build', gulp.parallel(
    'build:html',
    'build:js',
    'build:css',
    'build:images'
));
