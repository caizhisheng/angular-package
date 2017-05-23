/************************
des: 页面布局(页面导航)
date: 2016/12/01
auth: mike
************************/
import ngApp from '../../components/app';
ngApp.directive('nav',function() {
  return {
  	restrict: "E",
  	templateUrl: "../../build/html/layout/nav.html",
  	replace: true
  }
}); 