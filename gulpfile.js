const path = require('path');
const gulp = require('gulp');
const pump = require('pump');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');

const paths = {
    stylesheets: './static/stylesheets/**/*.css',
    javascripts: './static/javascripts/**/*.js'
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

gulp.task('build', ['build:css', 'build:js']);
