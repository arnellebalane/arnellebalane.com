const gulp = require('gulp');
const critical = require('critical').stream;
const htmlmin = require('gulp-htmlmin');
const dom = require('gulp-dom');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const imageminJpegOptim = require('imagemin-jpegoptim');
const revall = require('gulp-rev-all');
const revdel = require('gulp-rev-delete-original');
const replace = require('gulp-replace');
const size = require('gulp-size');
const workbox = require('workbox-build');

function sizeStream(title) {
    return size({
        title,
        gzip: true,
        showFiles: true
    });
}

gulp.task('build:html', () => {
    return gulp.src('_site/**/*.html')
        .pipe(sizeStream('build:html'))
        .pipe(critical({
            base: '_site',
            inline: true,

            // Don't include theme-related CSS, because they are going to be
            // conditionally loaded depending on the color scheme preferences.
            // There must be a better way to do this, perhaps by ignoring
            // entire CSS files directly.
            ignore: [':root', 'img', /SocialLink/]
        }))
        .pipe(dom(function() {
            // Critical uses link[rel="preload"] magic to load non-critical CSS,
            // but it does this for the CSS files that are used for color schemes,
            // making the theme switcher not functional anymore. This manipuates
            // the generated HTML to undo Critical's changes, but only for those
            // that are related to the themes.
            this.querySelectorAll('link[media]').forEach(link => {
                link.rel = 'stylesheet';
                link.removeAttribute('as');
                link.removeAttribute('onload');
                link.nextElementSibling.remove();
            });
            return this;
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('_site'));
});

gulp.task('build:modules', () => {
    return gulp.src('_site/static/javascripts/main.mjs')
        .pipe(sizeStream('build:modules'))
        .pipe(babel())
        .pipe(gulp.dest('_site/static/javascripts'));
});

gulp.task('build:js', () => {
    return gulp.src('_site/**/*.{js,mjs}')
        .pipe(sizeStream('build:js'))
        .pipe(terser())
        .pipe(gulp.dest('_site'));
});

gulp.task('build:css', () => {
    return gulp.src('_site/**/*.css')
        .pipe(sizeStream('build:css'))
        .pipe(cssnano())
        .pipe(gulp.dest('_site'));
});

gulp.task('build:images', () => {
    return gulp.src('_site/**/*.{jpg,png,svg}')
        .pipe(sizeStream('build:images'))
        .pipe(imagemin([
            imageminJpegOptim({
                progressive: true,
                max: 80
            }),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest('_site'));
});

gulp.task('build:sw', () => {
    return workbox.injectManifest({
        swSrc: 'source/sw.js',
        swDest: '_site/sw.js',
        globDirectory: '_site',
        globPatterns: ['**\/*.{mjs,js,css,png,jpg,svg,woff2}']
    });
});

gulp.task('build:rev', () => {
    return gulp.src('_site/**/*')
        .pipe(revall.revision({
            dontRenameFile: [/\.html$/, 'sw.js'],
            dontUpdateReference: [/\.html$/, 'sw.js']
        }))
        .pipe(revdel())
        .pipe(gulp.dest('_site'));
});

gulp.task('build:metatags', () => {
    // gulp-rev-all doesn't update references to assets that are loaded using
    // absolute paths, e.g. og:image metatag, so I had to load them using
    // relative paths and use gulp-replace to convert them back to absolute
    // paths after gulp-rev-all processes them.
    return gulp.src('_site/**/*.html')
        .pipe(replace(/<meta .+?>/g, match => {
            const baseUrl = 'https://arnellebalane';
            const metatags = ['og:url'];
            if (metatags.some(property => match.includes(property))) {
                return match.replace(/content="(.+?)"/, `content="${baseUrl}$1"`);
            }
            return match;
        }))
        .pipe(gulp.dest('_site'));
});

gulp.task('build:cloudinary', () => {
    const baseUrl = 'http://res.cloudinary.com/arnellebalane/image/upload';

    return gulp.src('_site/**/*.html')
        .pipe(replace(/\/?([\w-]+?\/)+?[\w.-]+?\.\w+\?cloudinary=(\w|,)+/g, match => {
            const [_, transforms] = match.match(/\?cloudinary=(.+)$/);
            const path = match.replace(/(^\/|\?cloudinary=.+$)/g, '');
            return [baseUrl, transforms, path].join('/');
        }))
        .pipe(gulp.dest('_site'));
});

gulp.task('build', gulp.series([
    'build:sw',
    'build:html',
    'build:modules',
    'build:js',
    'build:css',
    'build:images',
    'build:rev',
    'build:metatags',
    'build:cloudinary'
]));
