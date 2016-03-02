'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var templateCache = require('gulp-angular-templatecache');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var flatten = require('gulp-flatten');
var useref = require('gulp-useref');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var replace = require('gulp-replace');
var jscs = require('gulp-jscs');
var express = require('express');
var del = require('del');
var browserSync = require('browser-sync').create();
var argv = require('yargs').argv;
var stylish = require('gulp-jscs-stylish');
var karma = require('karma');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');

var common = require('./common');

// Determines which config file is used in src/app/config (defaults to "production")
var config = argv.config || 'production';
gutil.log('config: ' + config + ' (--config NAME)');

function noop() {}

// Delete built files
gulp.task('clean', function() {
  return del(['dist', '.tmp']);
});

// Compile SASS to CSS
gulp.task('sass', function() {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass({
      includePaths: ['bower_components/bootstrap-sass/assets/stylesheets'],
      style: 'expanded'
    }))
    .pipe(gulp.dest('.tmp/serve/css'))
    .pipe(browserSync.reload({stream: true}));
});

// Lint the JavaScript source code (won't exit on error)
gulp.task('js', function() {
  return gulp.src('src/app/**/*.js')
    .pipe(jshint())
    .pipe(jscs())
    .on('error', noop) // continue despite linting errors
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(browserSync.reload({stream: true}));
});

// Inject the CSS and JavaScript files into index.html
gulp.task('inject', function() {
  var appStyles = gulp.src('.tmp/serve/css/**/*.css', {read: false});
  var appScripts = gulp.src(common.JS, {read: false});
  var configScript = gulp.src('src/app/config/' + config + '.js');
  var vendorScripts = gulp.src(common.JS_VENDOR, {read: false});
  var vendorStyles = gulp.src(common.CSS_VENDOR, {read: false});
  var ieScripts = gulp.src(common.JS_IE, {read: false});

  return gulp.src('src/index.html')
    .pipe(inject(appStyles, {name: 'app', ignorePath: ['src', '.tmp/serve']}))
    .pipe(inject(appScripts, {name: 'app', ignorePath: ['src', '.tmp/serve']}))
    .pipe(inject(configScript, {name: 'config', ignorePath: ['src']}))
    .pipe(inject(vendorScripts, {name: 'vendor'}))
    .pipe(inject(vendorStyles, {name: 'vendor'}))
    .pipe(inject(ieScripts, {name: 'ie'}))
    .pipe(gulp.dest('.tmp/serve'))
    .pipe(browserSync.reload({stream: true}));
});

// Minify the HTML templates and combine them into a single JavaScript file
gulp.task('templates', function() {
  return gulp.src('src/app/**/*.html')
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(templateCache({
      root: 'app/',
      module: 'radar',
      filename: 'templates.js'
    }))
    .pipe(gulp.dest('.tmp/templates'));
});

gulp.task('html', function() {
  var rewrite = lazypipe()
    .pipe(function() {
      var jqueryUi = lazypipe()
        .pipe(replace, 'images/', '../images/jquery-ui/');

      // glob is relative to src/index.html
      return gulpif('../../bower_components/jquery-ui/**/*.css', jqueryUi());
    });

  var templates = gulp.src('.tmp/templates/*.js', {read: false});

  // Concatenate and minify the JavaScript files
  var js = lazypipe()
    .pipe(rev)
    .pipe(uglify);

  // Concatenate and minify the CSS files
  var css = lazypipe()
    .pipe(rev)
    .pipe(replace, '/bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/')
    .pipe(minifyCss, {compatibility: 'ie8'});

  // Minify the HTML
  var html = lazypipe()
    .pipe(minifyHtml, {
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    });

  return gulp.src('.tmp/serve/index.html')
    .pipe(inject(templates, {name: 'templates', ignorePath: '.tmp/templates'}))
    .pipe(useref({}, rewrite))
    .pipe(gulpif('*.js', js()))
    .pipe(gulpif('*.css', css()))
    .pipe(revReplace())
    .pipe(gulpif('*.html', html()))
    .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function() {
  return gulp.src(common.FONTS_VENDOR)
    .pipe(flatten())
    .pipe(gulp.dest('dist/fonts'));
});

// Optimise the copy the images used by JQueryUI
gulp.task('images-jquery-ui', function() {
  return gulp.src(common.IMAGES_JQUERY_UI)
    .pipe(imagemin({optimizationLevel: 3}))
    .pipe(gulp.dest('dist/images/jquery-ui'));
});

// Optimise and copy the application's images
gulp.task('images', gulp.parallel('images-jquery-ui', function() {
  return gulp.src(common.IMAGES)
    .pipe(imagemin({optimizationLevel: 3}))
    .pipe(gulp.dest('dist/images'));
}));

// Print the size of each built file
gulp.task('size', function() {
  return gulp.src('dist/**/*')
    .pipe(size({showFiles: true}));
});

// Build the application for development (no optimisations)
gulp.task('build', gulp.series(gulp.parallel('js', 'sass'), 'inject'));

// Build the application for distribution (output is optimised)
gulp.task('build:dist', gulp.series(
  'clean',
  gulp.parallel('js', 'sass', 'templates'),
  'inject',
  gulp.parallel('html', 'fonts', 'images'),
  'size'
));

// Refresh the page in the web browser
gulp.task('reload', function(done) {
  browserSync.reload();
  done();
});

// Watch source files for changes and rebuild intermediate files
gulp.task('watch', gulp.series('build', function() {
  // Wrap gulp.watch with logging
  function watch(glob, opt, task) {
    return gulp.watch(glob, opt, task)
      .on('add', function(path) {
        gutil.log(gutil.colors.green('Added ' + path));
      })
      .on('change', function(path) {
        gutil.log(gutil.colors.yellow('Modified ' + path));
      })
      .on('unlink', function(path) {
        gutil.log(gutil.colors.red('Deleted ' + path));
      });
  }

  watch('src/app/**/*.js', gulp.series('js'))
    .on('add', gulp.series('inject'))
    .on('unlink', gulp.series('inject'));

  watch('src/sass/**/*.scss', gulp.series('sass'))
    .on('add', gulp.series('inject'))
    .on('unlink', gulp.series('inject'));

  watch('src/index.html', gulp.series('inject'));

  watch(['src/app/**/*.html', '!src/index.html'], gulp.series('reload'));
}));

// Proxy requests to NGINX or Express
// BrowserSync will refresh the page when a source file changes
gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: 'http://localhost:8082',
    open: false
  });
});

// Serve the development build with Express
gulp.task('express', function() {
  var app = express();

  // Rules are checked in the ordered they are defined
  app.use(express.static('.tmp/serve'));
  app.use(express.static('src'));
  app.use('/bower_components', express.static('bower_components'));

  app.get('/', function(req, res) {
    res.sendFile('.tmp/serve/index.html');
  });

  app.listen(8082);
});

// Serve the distribution build with Express
gulp.task('express:dist', function() {
  var app = express();

  app.use(express.static('dist'));

  app.get('/', function(req, res) {
    res.sendFile('dist/index.html');
  });

  app.listen(8081);
});

// Lint the JavaScript source code (exits on error unlike the "js" task)
gulp.task('lint', function() {
  return gulp.src('src/app/**/*.js')
    .pipe(jshint())
    .pipe(jscs())
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// Run the tests
gulp.task('test', function(cb) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    browsers: ['PhantomJS'],
    reporters: ['dots']
  }, cb).start();
});

// Run the tests and produce a test coverage report
gulp.task('coverage', function(cb) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    browsers: ['PhantomJS'],
    reporters: ['dots', 'coverage']
  }, cb).start();
});

// Run the tests with Sauce Labs
gulp.task('sauce-labs', function(cb) {
  new karma.Server({
    configFile: __dirname + '/sauce-labs.conf.js',
    singleRun: true
  }, cb).start();
});

// Build the development build and watch for changes
// Express serves the files and BrowserSync provides live reload
gulp.task('serve', gulp.parallel('watch', 'browser-sync', 'express'));

// Build the distribution build and serve the files with Express
gulp.task('serve:dist', gulp.series('build:dist', 'express:dist'));

// Run the "serve" task by default
gulp.task('default', gulp.series('serve'));
