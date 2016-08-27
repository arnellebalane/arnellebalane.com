import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import cleancss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import sourcemaps from 'gulp-sourcemaps';


const PATHS = {
    stylesheets: 'static/stylesheets/**/*.css',
    javascripts: 'static/javascripts/**/*.js',
    images: 'static/images/**/*',
    fonts: 'static/fonts/**/*'
};
const BUILD_DIRECTORY = 'build';


gulp.task('buildstyles', () => {
    return gulp.src(PATHS.stylesheets, { base: 'static' })
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(cleancss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(BUILD_DIRECTORY));
});


gulp.task('buildscripts', () => {
    return gulp.src(PATHS.javascripts, { base: 'static' })
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(BUILD_DIRECTORY));
});


gulp.task('optimizeimages', () => {
    return gulp.src(PATHS.images, { base: 'static' })
        .pipe(imagemin())
        .pipe(gulp.dest(BUILD_DIRECTORY));
});


gulp.task('copystatic', () => {
    return gulp.src(PATHS.fonts, { base: 'static' })
        .pipe(gulp.dest(BUILD_DIRECTORY));
});


gulp.task('default', [
    'buildstyles',
    'buildscripts',
    'optimizeimages',
    'copystatic'
]);
