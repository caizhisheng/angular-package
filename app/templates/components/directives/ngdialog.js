/************************
des: 页面布局(弹出层)
date: 2016/12/12
auth: mike
************************/
import ngApp from '../../components/app';
ngApp.directive('ngDialog',function() {
  return {
  	restrict: "E",
  	templateUrl: "../../build/html/layout/dialog.html",
  	replace: true,
  	link: ($scope,$element,attrs) => {
      
  	}
  }
});