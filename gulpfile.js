const path = require('path');
const gulp = require('gulp');
const pump = require('pump');
const del = require('del');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const runsequence = require('run-sequence');

const paths = {
    stylesheets: './static/stylesheets/**/*.css',
    javascripts: './static/javascripts/**/*.js',
    images: './static/images/**/*',
    fonts: './static/fonts/**/*',
    templates: './views/**/*.html',
};
const buildDirectory = path.join(__dirname, 'build');

gulp.task('build:css', (cb) => {
    pump([
        gulp.src(paths.stylesheets, { base: '.' }),
        cssnano(),
        gulp.dest(buildDirectory)
    ], cb);
});

gulp.task('build:js', (cb) => {
    pump([
        gulp.src(paths.javascripts, { base: '.' }),
        babel(),
        uglify(),
        gulp.dest(buildDirectory)
    ], cb);
});

gulp.task('build:html', (cb) => {
    pump([
        gulp.src(paths.templates, { base: '.' }),
        htmlmin({
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        }),
        gulp.dest(buildDirectory)
    ], cb);
});

gulp.task('build:images', (cb) => {
    pump([
        gulp.src(paths.images, { base: '.' }),
        imagemin(),
        gulp.dest(buildDirectory)
    ], cb);
});

gulp.task('copy', (cb) => {
    pump([
        gulp.src(paths.fonts, { base: '.' }),
        gulp.dest(buildDirectory)
    ], cb);
});

gulp.task('delete', () => del(buildDirectory));

gulp.task('build', () => runsequence(
    'delete',
    ['build:css', 'build:js', 'build:html', 'build:images', 'copy']
));
