var gulp = require('gulp');
var less = require('gulp-less');
var jade = require('gulp-jade');

var express = require('express');
var static  = require('express-static');

gulp.task('default', [ 'less', 'jade', 'copy', 'watch', 'server' ]);

gulp.task('less', function(){
  gulp
    .src([
      'src/less/angry.less',
      'src/less/stylesheet.less'
    ])
    .pipe(less())
    .pipe(gulp.dest('build/css'))
});


gulp.task('jade', function(){
  gulp
    .src('src/jade/*.jade')
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('build'))
});

gulp.task('watch', function(){
  gulp.watch('src/less/*.less', [ 'less' ])
  gulp.watch('src/jade/*.jade', [ 'jade' ])
});

gulp.task('copy', function(){
  gulp
    .src('src/fonts/*')
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('server', function(){
  var app = express();

  app.use(static(__dirname + '/build'));

  var server = app.listen(1337, function(){
    console.log('server is running at %s', server.address().port);
  })
});
