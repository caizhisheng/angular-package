var path = require('path');
var chalk = require('chalk'); //不同颜色的info
var yeoman = require('yeoman-generator');
var yosay = require('yosay'); //yeoman弹出框

var Angularpackage = yeoman.Base.extend({
    info: function() {
        this.log(chalk.green(
            'I am going to build your app!'
        ));
    },
    generateBasic: function() { //按照自己的templates目录自定义
        this.directory('assets', 'assets'); //拷贝目录
        this.directory('components', 'components');
        this.directory('controller', 'controller');
        this.directory('mock', 'mock');
        this.directory('views', 'views');

        this.copy('package.json', 'package.json'); //拷贝文件
        this.copy('index.html', 'index.html');
        this.copy('README.md', 'README.md');
        this.copy('gulpfile.js', 'gulpfile.js');
        this.copy('webpack.config.js', 'webpack.config.js');
        this.copy('403.html', '403.html');
    },
    generateClient: function() {
        this.sourceRoot(path.join(__dirname, 'templates'));
        this.destinationPath('./');
    },
    install: function() { //安装依赖
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    },
    end: function() {
        this.log(yosay(
            'Your app has been created successfully!'
        ));
    }
});
module.exports = Angularpackage;
