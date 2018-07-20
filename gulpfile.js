var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var watch = require('gulp-watch');

gulp.task('html', function () {
    return gulp.src('./source/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('./app'))
})

gulp.task('sass', function () {
    var plugins = [
        autoprefixer({browsers: ['last 1 version', '> 5%', 'ie 8']})
    ];
    return gulp.src('./source/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('stream', function () {
    return watch('./source/scss/**/*.scss', {
        ignoreInitial: false
    })
        .pipe(gulp.dest('./app/css'));
});

gulp.task('default', ['html', 'sass', 'stream']);