import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import cleancss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import sourcemaps from 'gulp-sourcemaps';
import cache from 'gulp-cached';
import del from 'del';


const PATHS = {
    views: 'server/views/**/*.html',
    stylesheets: 'public/stylesheets/**/*.css',
    javascripts: 'public/javascripts/**/*.js',
    images: 'public/images/**/*',
    fonts: 'public/fonts/**/*',
    manifest: 'public/manifest.json'
};
const BUILD_DIRECTORY = 'build';


gulp.task('clean', _ => {
    return del(BUILD_DIRECTORY);
});


gulp.task('buildstyles', _ => {
    return gulp.src(PATHS.stylesheets, { base: '.' })
        .pipe(cache('stylesheets'))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(cleancss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(BUILD_DIRECTORY));
});


gulp.task('buildscripts', _ => {
    return gulp.src(PATHS.javascripts, { base: '.' })
        .pipe(cache('javascripts'))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(BUILD_DIRECTORY));
});


gulp.task('buildviews', _ => {
    return gulp.src(PATHS.views, { base: '.' })
        .pipe(cache('views'))
        .pipe(htmlmin({
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true
        }))
        .pipe(gulp.dest(BUILD_DIRECTORY));
});


gulp.task('optimizeimages', _ => {
    return gulp.src(PATHS.images, { base: '.' })
        .pipe(cache('images'))
        .pipe(imagemin())
        .pipe(gulp.dest(BUILD_DIRECTORY));
});


gulp.task('copystatic', _ => {
    return gulp.src([PATHS.fonts, PATHS.manifest], { base: '.' })
        .pipe(cache('staticfiles'))
        .pipe(gulp.dest(BUILD_DIRECTORY));
});


gulp.task('build', ['buildstyles', 'buildscripts', 'buildviews', 'optimizeimages', 'copystatic']);


gulp.task('watch', _ => {
    gulp.watch(PATHS.stylesheets, ['buildstyles']);
    gulp.watch(PATHS.javascripts, ['buildscripts']);
    gulp.watch(PATHS.views, ['buildviews']);
    gulp.watch(PATHS.images, ['optimizeimages']);
    gulp.watch([PATHS.fonts, PATHS.manifest], ['copystatic']);
});


gulp.task('default', ['build', 'watch']);
