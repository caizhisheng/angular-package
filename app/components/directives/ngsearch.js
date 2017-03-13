/************************
des: 搜索指令
date: 2016/12/08
auth: mike
************************/
import ngApp from '../../components/app';

ngApp.directive('ngSearch',['questfactory',function(questfactory) {
  return {
    restrict: "E",
    templateUrl: "../../build/html/components/search_tpl.html",
    scope: {
      searchs: '='
    },
    replace: false,
    link: function($scope, $element, attrs) {
      $scope.searchs = $scope.searchs;
      $scope.search = () => {
          $scope.$parent.search(); //调用父类controller方法
        }
    }
  }
}]);