let initialProjectFolder = 'c:/xampp/htdocs/MI_PROJECTS/Bootstrap/newPrj/speedaPrj';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

let paths = {

    styles:{
        src: "./scss/**/*.scss",
        dest: "./dist/css"
    },

    scripts: {
        src: "./js/**/*.js",
        dest: "./dist/js"
    }
}

function styles(){
    
    return gulp.src(paths.styles.src)
    .pipe(sass())
    .on('error',sass.logError)
    .pipe(postcss([autoprefixer('last 2 versions')]))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(postcss([autoprefixer('last 2 version'), cssnano()]))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.reload({
        stream: true
    }))
}

function scripts(){
    return gulp.src(paths.scripts.src)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.reload({
        stream: true
    }))
}

function watch(){
    browserSync.init({
        // proxy: initialProjectFolder,
        // online: false,
        // port: 3000,
        // notify: false
        server: './'
    })
    gulp.watch(paths.styles.src,styles);
    gulp.watch(paths.scripts.src,scripts);
    gulp.watch('*.html').on('change',browserSync.reload);
}

exports.watch = watch;
exports.styles = styles;
exports.scripts = scripts;

let build = gulp.parallel(styles,scripts,watch);

exports.default = build;