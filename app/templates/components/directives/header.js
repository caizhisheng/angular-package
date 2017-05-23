/************************
des: 页面布局(头部指令)
date: 2016/12/01
auth: mike
************************/
import ngApp from '../../components/app';
ngApp.directive('header',function() {
  return {
  	restrict: "E",
  	templateUrl: "../../build/html/layout/header.html",
  	replace: true
  	// link: function(scope, element, attrs) { 
         //注册编译后指令元素的事件等
  	// },
   //  compile: function(element,attrs) {
        //指令编译期间处理
   //  }
  }
});