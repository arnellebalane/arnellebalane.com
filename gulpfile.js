const gulp = require('gulp');
const critical = require('critical').stream;
const htmlmin = require('gulp-htmlmin');
const dom = require('gulp-dom');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const revall = require('gulp-rev-all');
const revdel = require('gulp-rev-delete-original');
const replace = require('gulp-replace');
const size = require('gulp-size');
const workbox = require('workbox-build');
const gulpif = require('gulp-if');
const cloudinaryUpload = require('gulp-cloudinary-upload');

const SITE_BASE_URL = 'https://arnellebalane.com';
const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/arnellebalane/image/upload';
const SELF_HOSTED_IMAGES = [
    '**/static/images/favicon.png',
    '**/static/images/icon-apple-touch.png'
];

function sizeStream(title) {
    return size({
        title,
        gzip: true,
        showFiles: true
    });
}

function cloudinaryUploadStream(folder) {
    require('dotenv').config();

    return cloudinaryUpload({
        config: {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        },
        params: {
            overwrite: true,
            folder
        }
    });
}

gulp.task('build:html', () => {
    return gulp.src('_site/**/*.html')
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
        .pipe(sizeStream('build:html'))
        .pipe(gulp.dest('_site'));
});

gulp.task('build:modules', () => {
    return gulp.src('_site/static/javascripts/main.mjs')
        .pipe(babel())
        .pipe(sizeStream('build:modules'))
        .pipe(gulp.dest('_site/static/javascripts'));
});

gulp.task('build:js', () => {
    return gulp.src('_site/**/*.{js,mjs}')
        .pipe(terser())
        .pipe(sizeStream('build:js'))
        .pipe(gulp.dest('_site'));
});

gulp.task('build:css', () => {
    return gulp.src('_site/**/*.css')
        .pipe(cssnano())
        .pipe(sizeStream('build:css'))
        .pipe(gulp.dest('_site'));
});

gulp.task('build:images', () => {
    // Only optiomize SVG images, since PNG and JPG are now uploaded to
    // Cloudinary who will do the processing for us.
    return gulp.src('_site/**/*.svg')
        .pipe(imagemin())
        .pipe(sizeStream('build:images'))
        .pipe(gulp.dest('_site'));
});

gulp.task('build:sw', () => {
    return workbox.injectManifest({
        swSrc: 'source/sw.js',
        swDest: '_site/sw.js',
        globDirectory: '_site',
        globPatterns: [
            '**\/*.{mjs,js,css,svg}',
            '**\/Inter-variable-*-subset.*',
            ...SELF_HOSTED_IMAGES
        ]
    });
});

gulp.task('build:rev', () => {
    return gulp.src('_site/**/*')
        .pipe(revall.revision({
            dontRenameFile: [/\.(html|xml)$/, 'sw.js'],
            dontUpdateReference: [/\.(html|xml)$/, 'sw.js']
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
            const metatags = ['og:url'];
            if (metatags.some(property => match.includes(property))) {
                return match.replace(/content="(.+?)"/, `content="${SITE_BASE_URL}$1"`);
            }
            return match;
        }))
        .pipe(gulp.dest('_site'));
});

gulp.task('build:cloudinary', () => {
    return gulp.src([
            '_site/**/*.{html,xml,webmanifest}',
            '_site/sw.js'
        ])
        .pipe(replace(/\/?([\w-]+?\/)+?[\w.-]+?\.\w+\?cloudinary=(\w|,)+/g, match => {
            const [_, transforms] = match.match(/\?cloudinary=(.+)$/);
            const path = match.replace(/(^\/|\?cloudinary=.+$)/g, '');
            return [CLOUDINARY_BASE_URL, transforms, 'arnellebalane.com', path].join('/');
        }))
        .pipe(gulp.dest('_site'));
});

gulp.task('upload:cloudinary', () => {
    require('dotenv').config();

    return gulp.src('_site/**/*.{jpg,png}')
        .pipe(gulpif(
            /static\/images/,
            cloudinaryUploadStream('arnellebalane.com/static/images'),
            cloudinaryUploadStream('arnellebalane.com/assets')
        ))
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
