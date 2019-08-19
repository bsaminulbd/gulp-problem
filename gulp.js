var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglifycss = require('gulp-uglifycss');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');

gulp.task('css', function() {
  return gulp.src('./src/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(uglifycss())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/assets/css/'))
    .pipe(browserSync.stream())
});

gulp.task('html', function() {
  return gulp.src('./src/html/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
});

gulp.task('font', function() {
  return gulp.src('./src/webfonts/**/*')
    .pipe(gulp.dest('./dist/assets/webfonts/'))
});

gulp.task('image', function() {
  return gulp.src('./src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/assets/images/'))
    .pipe(browserSync.stream())
});

gulp.task('js', function() {
  return gulp.src('./src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/assets/js/'))
    .pipe(browserSync.stream())
});

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
});

gulp.task('default', gulp.series('css', 'js', 'image', 'html', 'font', 'browserSync'));
