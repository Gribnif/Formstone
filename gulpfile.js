var fs             = require('fs');
// var moment         = require('moment');
var gulp           = require('gulp');
var autoprefixer   = require('gulp-autoprefixer');
// var cssbeautify    = require('gulp-cssbeautify');
var clean          = require('gulp-clean');
var cleanCSS       = require('gulp-clean-css');
var clip           = require('gulp-clip-empty-files');
var documentation  = require('gulp-documentation');
var header         = require('gulp-header');
// var htmlbeautify   = require('gulp-html-beautify');
var include        = require('gulp-include');
// var jsbeautify     = require('gulp-beautify');
var jshint         = require('gulp-jshint');
var less           = require('gulp-less');
// var modernizr      = require('gulp-modernizr');
var rename         = require('gulp-rename');
// var replaceInclude = require('gulp-replace-include');
// var sequence       = require('gulp-sequence');
var tap            = require('gulp-tap');
var uglify         = require('gulp-uglify');
// var zetzer         = require('gulp-zetzer');
// var buildDocs      = require('./tasks/docs.js');

var lessImportNPM  = require('less-plugin-npm-import');

// Vars
var pkg = require('./package.json');
// var date = moment().format('YYYY-MM-DD');
var date = 'DATE HERE';
var comment = '/*! <%= pkg.name %> v<%= pkg.version %> [<%= filename %>] <%= date %> |' +
  ' <%= pkg.license %> License | <%= pkg.homepage_short %> */\n';

// Clean

gulp.task('clean', function () {
  return gulp.src(['dist/*', 'docs/*'], { read: false })
    .pipe(clean());
});

// Less
gulp.task('styles', function() {
  return gulp.src(['./src/less/**/*.less', '!./src/less/imports/*'])
    .pipe(less({
      plugins: [ new lessImportNPM() ],
      globalVars: pkg.src.vars
    }))
    .pipe(autoprefixer({
      // browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie >= 10']
    }))
    // .pipe(cleanCSS({
    //   // compatibility: 'ie10'
    // }))
    .pipe(clip())
    // .pipe(header(comment, {
    //   pkg:  pkg,
    //   date: date
    // }))
    .pipe(gulp.dest('./dist/css'));
});

// JS
gulp.task('scripts', function() {
  return gulp.src('./src/js/*.js')
    .pipe(include({
      includePaths: [
        __dirname + '/src/js/',
        __dirname + '/node_modules/'
      ]
    }))
    .pipe(jshint())
    // .pipe(uglify())
    // .pipe(header(comment, {
    //   pkg:  pkg,
    //   date: date
    // }))
    // .pipe(replaceInclude({
    //   prefix: '@',
    //   global: {
    //     version: pkg.version
    //   }
    // }))
    .pipe(gulp.dest('./dist/js'));
});

// // Docs

// gulp.task('buildDocs', function (done) {
//   return buildDocs(done);
// });

// // Demo - Less
// gulp.task('demoStyles', function() {
//   return gulp.src(['./demo/css/src/*.less'])
//     .pipe(less({
//       plugins: [ new lessImportNPM() ],
//       globalVars: pkg.src.vars
//     }))
//     .pipe(autoprefixer({
//       // browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie >= 10']
//     }))
//     .pipe(cleanCSS({
//       compatibility: 'ie10'
//     }))
//     .pipe(clip())
//     .pipe(gulp.dest('./demo/css'));
// });

// // Demo - JS
// gulp.task('demoScripts', function() {
//   return gulp.src('./demo/js/src/*.js')
//     .pipe(include({
//       includePaths: [
//         __dirname,
//         __dirname + "/demo/js/src",
//         __dirname + "/node_modules"
//       ]
//     }))
//     .pipe(replaceInclude({
//       prefix: '@',
//       global: pkg.src.vars
//     }))
//     .pipe(replaceInclude({
//       prefix: '@',
//       global: {
//         version: pkg.version
//       }
//     }))
//     .pipe(jshint())
//     // .pipe(uglify())
//     .pipe(gulp.dest('./demo/js'));
// });

// // Demo - Modernizr
// gulp.task('demoModernizr', function () {
//   return gulp.src(['demo/js/*.js', 'demo/css/*.css'])
//     .pipe(modernizr({
//       'tests': [
//         'js',
//         'touchevents'
//       ],
//       'options': [
//         'setClasses',
//         'addTest',
//         'testProp',
//         'fnBind'
//       ]
//     }))
//     .pipe(uglify())
//     .pipe(gulp.dest('demo/js/'));
// });

// // Demo - HTML
// gulp.task('zetzer', function(){
//    return gulp.src('./demo/_src/pages/**/*.md')
//     .pipe(zetzer({
//       partials: './demo/_src/_templates/',
//       templates: './demo/_src/_templates/',
//       env: {
//         title: 'Formstone',
//         version: pkg.version
//       }
//     }))
//     .pipe(rename(function(path) {
//       path.extname = '.html'
//     }))
//     .pipe(htmlbeautify())
//     .pipe(gulp.dest('./demo'));
// });

// // License

// gulp.task('license', function(done) {
//   return fs.readFile('tasks/gpl.txt', function(err, data) {
//     var content = 'Formstone \n\n' +
//       'Copyright ' + moment().format('YYYY') + ' ' + pkg.author.name + ' \n\n' +
//       data;

//     fs.writeFile('license.txt', content, function() {});

//     done();
//   });
// });

// Beautify

// gulp.task('beautifyScripts', function() {
//   return gulp.src('./src/js/**/*.js')
//     .pipe(jsbeautify({
//       indent_size: 2,
//       end_with_newline: true
//     }))
//     .pipe(gulp.dest('./src/js/'));
// });

// gulp.task('beautifyStyles', function() {
//   return gulp.src('./src/less/**/*.less')
//     .pipe(cssbeautify({
//       indent: '  ',
//       autosemicolon: true
//     }))
//     .pipe(gulp.dest('./src/less/'));
// });

// Minify

gulp.task('minifyScripts', function() {
  return gulp.src('./dist/js/**/*.js')
    .pipe(uglify())
    .pipe(header(comment, {
      pkg:  pkg,
      date: date
    }))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('minifyStyles', function() {
  return gulp.src('./dist/css/**/*.css')
    .pipe(cleanCSS({
      // compatibility: 'ie10'
    }))
    .pipe(header(comment, {
      pkg:  pkg,
      date: date
    }))
    .pipe(gulp.dest('./dist/css/'));
});

// Docs

gulp.task('docs', function() {
  return gulp.src('./src/js/*.js')
    .pipe(tap(function(file, t) {
      var base = file.path.split('/').pop().split('.').shift();

      gulp.src(file.path)
        .pipe(documentation('md', {
          filename: base + '.md'
        }))
        .pipe(gulp.dest('docs'));

      gulp.src(file.path)
        .pipe(documentation('json', {
          filename: base + '.json'
        }))
        .pipe(gulp.dest('docs'));
    }));
});

// Tasks

// gulp.task('beautify', gulp.series('beautifyStyles', 'beautifyScripts'));
gulp.task('minify', gulp.series('minifyStyles', 'minifyScripts'));

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('styles', 'scripts'),
  // 'buildDocs',
  // gulp.parallel('demoStyles', 'demoScripts'),
  // 'demoModernizr',
  // gulp.parallel('zetzer', 'license')
  'minify'
));

gulp.task('dev', gulp.series(
  'clean',
  gulp.parallel('styles', 'scripts'),
));

// gulp.task('demo', function(callback) {
//   sequence(
//     ['styles', 'scripts'],
//     ['demoStyles', 'demoScripts']
//   )(callback);
// });

gulp.task('watch', gulp.series('dev', function(done) {
  gulp.watch('./src/less/**/*.less', gulp.series('styles'));
  gulp.watch('./src/js/**/*.js', gulp.series('scripts'));

  // gulp.watch('./src/docs/**/*', ['buildDocs', 'zetzer']);
  // gulp.watch('./demo/css/src/**/*', ['demoStyles']);
  // gulp.watch('./demo/js/src/**/*', ['demoScripts']);
}));