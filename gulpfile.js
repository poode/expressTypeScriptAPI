const gulp   = require('gulp');
const tsc    = require('gulp-tsc');
const shell  = require('gulp-shell');
const runseq = require('run-sequence');
const tslint = require('gulp-tslint');

const paths = {
  tscripts : {
      src : ['app/src/**/*.*'],
      otherSrc : ['app/src/**/*.*', '!app/src/**/*.ts', '!app/src/views/*.jade'],
      tsSrc : ['app/src/**/*.ts'],
      dest : 'app/build',
    }
};

gulp.task('default', ['lint', 'buildrun']);

// ** Running ** //

gulp.task('run', shell.task([
  'node app/build/bin/www'
]));

gulp.task('buildrun', function (cb) {
  runseq('build', 'run', cb);
});

// ** Watching ** //

gulp.task('watch', function () {
  gulp.watch(paths.tscripts.src, ['bower', 'compile:typescript', 'moveOtherFiles']);
});

gulp.task('watchrun', function () {
  gulp.watch(paths.tscripts.src, runseq('compile:typescript', 'run'));
});

// ** Compilation ** //

gulp.task('build', ['bower','compile:typescript', 'moveOtherFiles']);
gulp.task('compile:typescript', function () {
  return gulp
  .src(paths.tscripts.tsSrc)
  .pipe(tsc())
  .pipe(gulp.dest(paths.tscripts.dest));
});

gulp.task('moveOtherFiles',function () {
  return gulp
  .src(paths.tscripts.otherSrc)
  .pipe(gulp.dest(paths.tscripts.dest));
});

// ** Linting ** //

gulp.task('lint', ['lint:default']);
gulp.task('lint:default', function(){
      return gulp.src(paths.tscripts.src)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
          emitError: false
        }));
});

const wiredep = require('wiredep').stream;

gulp.task('bower', function () {
  gulp.src('./app/src/views/*.jade')
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('./app/build/views'));
});
