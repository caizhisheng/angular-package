/************************
des: 站点全局模块
date: 2016/11/28
auth: mike
************************/ 
let ngApp = angular.module("ngApp", ['ui.router']);
//import {apiConfig} from '../components/config';

//配置阶段  注入全局路由服务 routerproviderProvider
ngApp.config(['$httpProvider','routerproviderProvider',function($httpProvider,routerproviderProvider) {
   //$httpProvider.interceptors.push('requestInterceptorfactory'); //注入全局请求拦截器
   //注入X-Requested-With属性
   $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
   //$httpProvider.defaults.headers.common['Content-Security-Policy'] = "script-src 'self'; object-src 'none'"

}]);

//运行阶段
ngApp.run(['$rootScope','$location','rolefactory',function($rootScope,$location,rolefactory) {
  //监听路由事件
  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams) {
    //if(toState.name == 'login') return;// 如果是进入登录界面则允许
  });

  //获得用户菜单
  rolefactory.getUserMenu();

  //获取用户信息，并保存至$rootScope
  rolefactory.getUserRoles();
 
 }]);

export default ngApp;