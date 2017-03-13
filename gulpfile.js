/*
  gulp主要用来对脚本文件的合并、压缩等处理
*/
var gulp = require('gulp');
var connect = require('gulp-connect');
var del = require('del');
var uglify = require('gulp-uglify');
var sequence = require('gulp-run-sequence');

var browserSync = require('browser-sync');
var webpack = require('webpack');
var gulpwebpack = require('gulp-webpack');
var wpconf = require('./webpack.config.js');

var bs = browserSync.create();
var reload = browserSync.reload;

var compass = require('gulp-compass');
//var cssreset = require('postcss-css-reset');

var minimist = require('minimist');
var gutil = require('gulp-util');

//postcss
var postcss = require('gulp-postcss');
var alias = require('postcss-alias');
var crip = require('postcss-crip');
var magician = require('postcss-font-magician');
var triangle = require('postcss-triangle');
var circle = require('postcss-circle');
var linkColors = require('postcss-all-link-colors');
var center = require('postcss-center');
var clearfix = require('postcss-clearfix');
var position = require('postcss-position');
var size = require('postcss-size');
var verthorz = require('postcss-verthorz');
var colorShort = require('postcss-color-short');

var processors = [
    alias,
    crip,
    magician,
    triangle,
    circle,
    linkColors,
    center,
    clearfix,
    position,
    size,
    verthorz,
    colorShort
];

//默认development环境
var knowOptions = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'development'
  }
}

var options = minimist(process.argv.slice(2), knowOptions);

//生成filename文件，存入string内容
function string_src(filename, string) {
  var src = require('stream').Readable({ objectMode: true })
  src._read = function () {
    this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
    this.push(null)
  }
  return src
}

//清空dist目录
gulp.task('clear-build',function() {
 console.log("start run clean...");
 return del(['./build/*']);
});

//postcss编译
gulp.task('postcss',function () {
  console.log("start run css...");
  return gulp.src('./app/assets/postcss/**/*.css')
   .pipe(postcss(processors))
   .pipe(postcss([require('postcss-css-reset')({ /* options */ })]))
   .pipe(gulp.dest('./app/assets/css'));
});


function mvassets() {
  console.log("start mv assets...")
  return gulp.src('./app/assets/**/*')
             .pipe(gulp.dest('./build/assets'))
}

//webpack构建
gulp.task('webpack',['clear-build'],function() {
 console.log("start run webpack...");
 return gulp.src('./app')
	     .pipe(gulpwebpack(wpconf, webpack))
	     .pipe(gulp.dest('./build'))
	     // 自动刷新
	     .pipe(bs.stream())
       .on('end', mvassets);
});

//压缩components
gulp.task('jsmin-components', function () {
   console.log("start run jsmin...");
   return gulp.src('./build/*.js')
         .pipe(uglify({mangle: false})).pipe(gulp.dest('./build'));
});

//开启服务
gulp.task('server-start',['postcss','webpack'],function() {
	connect.server({
		port: 3006,
		livereload: true
	});
	console.log("服务启动成功！")
});

//重启服务
//reload任务，在执行reload之前先执行allJs和sass任务
gulp.task('reload',['postcss'],function () {
    //刷新web调试服务器
     return gulp.src('./app')
      .pipe(gulpwebpack(wpconf, webpack))
      .pipe(gulp.dest('./build'))
      .on('end', mvassets)
      .pipe(connect.reload());
});

gulp.task('bulid', function () {
     return gulp.src('./app')
      .pipe(gulpwebpack(wpconf, webpack))
      .pipe(gulp.dest('./build'))
      .on('end', mvassets);
});

//watch任务，开启一个监控
gulp.task('watch', function () {
    //监控数组中文件的修改，如果有修改则执行reload任务
    gulp.watch(['app/components/**/*.js','app/controller/*.js','app/assets/postcss/*.css','app/views/**/*'],['reload']);
});

gulp.task('constants', function() {
  //读入config.json文件
  var myConfig = require('./config.json');
  //取出对应的配置信息
  var envConfig = myConfig[options.env];
  var conConfig = "var apiConfig = "+JSON.stringify(envConfig)+"; export {apiConfig};";
  //生成config.js文件
  return string_src("config.js", conConfig)
      .pipe(gulp.dest('./app/components'))
});

//启动站点
gulp.task('mdp',['server-start','watch'],function() {
	  console.log("开始启动项目...")
});

//打包站点
gulp.task('mdp-build',['bulid'],function() {
    console.log("打包项目成功...")
});




