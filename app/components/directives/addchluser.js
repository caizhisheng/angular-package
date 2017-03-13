/************************
des: 新增渠道用户指令
date: 2017/01/16
auth: mike
************************/
import ngApp from '../../components/app';
ngApp.directive('chUser',['questfactory',function(questfactory) {
  return {
  	restrict: "E",
  	templateUrl: "../../build/html/components/channel_tpl.html",
  	replace: false,
  	link: function($scope,$element,attrs) {
      //$scope.searchs = $scope.searchs;
    }
  }
}]); 