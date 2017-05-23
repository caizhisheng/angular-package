/************************
des: 页面布局(页面导航)
date: 2016/12/01
auth: mike
************************/
import ngApp from '../../components/app';
ngApp.directive('ngNav',function() {
  return {
  	restrict: "E",
  	templateUrl: "../../build/html/layout/nav.html",
  	replace: true,
  	link: ($scope,$element,attrs) => {
      $scope.cname = attrs.cname;
      $scope.ename = "";//attrs.ename;
      $scope.icon = attrs.icon;
  	}
  }
}); 