var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var gulp = require('gulp');
var inject = require('gulp-inject');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

// Compile scss into CSS, autoprefix it, clean and minify it,
// put the result in the styles folder, & stream updates to the browser.
gulp.task('scss', function() {
  return gulp
    .src('src/scss/*.scss')
    .pipe(
      sass({
        'sourcemap=none': true
      })
    )
    .pipe(concat('styles.min.css'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('styles/'))
    .pipe(browserSync.stream());
});

// Concat jquery into one file with src JavaScript, uglify the result, put
// it into the js folder, and stream updates to the browser
gulp.task('js', function() {
  return gulp
    .src(['node_modules/jquery/dist/jquery.min.js', 'src/js/*.js'])
    .pipe(concat('index.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
});

// Inject processed css and js into index.pug, render the pug into index.html, & stream updates to the browser
gulp.task('pug', function() {
  var target = gulp.src('src/index.pug');
  var sources = gulp.src(['styles/*.css', 'js/*.js']);
  return target
    .pipe(inject(sources))
    .pipe(pug({ data: {} }))
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

// Static server + watching scss/pug/html files
gulp.task('serve', ['scss', 'js', 'pug'], function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('src/scss/*.scss', ['scss']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/*.pug', ['pug']);
  gulp.watch('*.html').on('change', browserSync.reload);
});
