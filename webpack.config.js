/************************
  auth：mike,
  desc: webpack配置,
  date: 2016/11/1 
************************/

// npm
var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var TransferWebpackPlugin = require('transfer-webpack-plugin');

// 插件
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

// vars
var isPrd = process.env.NODE_ENV === 'production';
var isDev = process.env.NODE_ENV === 'development';
var plugins = [];
var entries = {};

//loaders
var loaders = [
   { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
   //{ test: /\.css$/, loader: "style-loader!css-loader" },
   { test: /\.css$/, loader:ExtractTextPlugin.extract("style", "css") },
   { test: /\.html$/,loader: "raw-loader"}
];

(function() {
    
    var angular = glob.sync('./bower_components/angular/angular.min.js');
    var angularRouter = glob.sync('./bower_components/angular-ui-router/release/angular-ui-router.min.js');
    var angularResource = glob.sync('./bower_components/angular-resource/angular-resource.js');
    var controller = glob.sync('./app/controller/**/*.js');
    var provider = glob.sync('./app/components/provider/*.js');
    var factory = glob.sync('./app/components/factory/*.js');
    var services = glob.sync('./app/components/services/*.js');
    var directives = glob.sync('./app/components/directives/*.js');
    var commonjs = glob.sync('./app/components/common/*.js'); //公共过滤器等
    var jsmodule = glob.sync('./app/assets/**/*.js');
    var bracket = glob.sync('./app/assets/js/bracket/');
    var cssModule  = glob.sync('./app/css/**/*.css');
    var pageHtml = glob.sync('./app/views/**/*.html');
    var htmlFiles = [];
     
     //各业务逻辑脚本打包
    // controller.forEach(function(item) {
    //     var name = path.basename(item, '.js');
    //     entries[name] = path.dirname(item) + '/' + name;
    // });

     //各业务逻辑页面打包
    pageHtml.forEach(function(page) {
        //var chunkName = path.basename(page, '.html').replace("list","page");
        var nameArr = page.split('/');
        // console.log("----------------");
        // console.log(nameArr.length);
        var _buiddir = "";
        if(nameArr.length > 5) {
          _buiddir = __dirname +'/build/html/'+nameArr[3]+'/'+nameArr[4]+'/'+path.basename(page);
        } else {
          _buiddir = __dirname +'/build/html/'+nameArr[3]+'/'+path.basename(page);
        }
        plugins.push(
            new HtmlWebpackPlugin({
                template: page,
                filename: _buiddir,
                inject: false, //允许插件修改哪些内容，包括head与body
               // favicon: __dirname+'./dist/favicon.ico',
                hash: true, // index.js?hash
                chunks:[nameArr[3]],//每个html引用各自的css和js文件
                cache: true, // if true (default) try to emit the file only if it was changed.
                showErrors: true, // if true (default) errors details will be written into the html page.
                minify:{    //压缩HTML文件
                  removeComments:true,    //移除HTML中的注释
                  collapseWhitespace:true    //删除空白符与换行符
                }
            })
         );

    });

    //angular相关
    var angular = ['angular'];
    //angular路由
    var angularouter = ['angular-ui-router'];
    var angularResource = angularResource;
    //组件相关
    var components = ['./app/components/app.js']
                         .concat(provider)
                         .concat(factory)
                         .concat(services)
                         .concat(directives)
                         .concat(controller)
                         .concat(commonjs);

    //各组件等公共逻辑脚本打包
     entries.build = [].concat(angular)
                       .concat(angularouter)
                       .concat(angularResource)
                       .concat(components);

    //装载公共主件或第三方主件
    plugins.push(new CommonsChunkPlugin({ name: ['build'], filename: '[name].js'}));
    plugins.push(new CommonsChunkPlugin({ name: ['components','angularouter','angularResource','angular'], filename: '[name].js', minChunks: Infinity }));
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
    }));
    
    plugins.push(new HtmlWebpackPlugin({
      template: './app/components/view_tpl.html',
      filename: '../index.html',
      hash: true,
      inject: true
    }));

    return entries;
})();

// webpack configs
module.exports = {
    entry: entries,
    output: {
        path: path.join(__dirname, 'build'),
        filename: "controller/[name].js"
    },
    resolve: {
        // 明确查找路径，提高性能
        root: path.resolve('app'),
        modulesDirectories: ["node_modules"], //排除该目录下的文件
        extensions: ["", ".js", ".json"],
        alias: {
          //脚本文件引用路径简写
        }
    },
    module: {
        loaders: loaders
    },
    plugins: plugins,
    sourcemap: true 
};

