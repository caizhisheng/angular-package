/************************
des: 页面布局(左侧菜单)
date: 2016/12/01
auth: mike
************************/
import ngApp from '../../components/app';
ngApp.directive('leftPanel', ["$timeout", function(timer) {
  return {
    restrict: "E",
    templateUrl: "../../build/html/layout/leftpanel.html",
    replace: true,
    link: function($scope, elem, attr) {
      //菜单选择体系
      let menu_index = [
        {"key": "messagetpl","value": "messagetpl"},
        {"key": "messagetpl","value": "/messagetpl/create"},
        {"key": "messagetpl","value": "/messagetpl/edit"},
        {"key": "messagesend","value": "/messagesend"},
        {"key": "sendlog","value": "/sendlog"},
        {"key": "sendlogmore","value": "/sendlogmore"},
        {"key": "channel","value": "/channel"},
        {"key": "channel","value": "/channel/routeconfig"},
        {"key": "channel","value": "/channel/createroute"},
        {"key": "channel","value": "/channel/editroute/"},
        {"key": "user","value": "/user"},
        {"key": "role","value": "/role"}
      ];

      $scope.getCurMenu = () => {
        menu_index.map(function(item) {
          if (location.hash.indexOf(item.value) >= 0) {
            $scope.cur_url = item.key;
          }
        });
      },

      timer(function() {
        $scope.getCurMenu();
        $(".chactive").each(function() {
            if("#/"+$scope.cur_url == $(this).attr("href")) {
              $("#main_nav-profiles .nav-parent").eq(parseInt($(this).attr("sid"))).find("a").eq(0).click();
              $(this).css({
                "color": "#1caf9a"
              });
              $(this).parent().siblings().find(".chactive").css({
                "color": "#94989d"
              });
            }
        });
      }, 200);
      $(window).bind('hashchange', function(event) {
        $(".chactive").css({"color": "#94989d"});
        $scope.getCurMenu();
        $(".chactive").each(function() {
          if ("#/"+$scope.cur_url == $(this).attr("href")) {
            if ($(this).parents(".children").attr("status") == "up") {
              $("#main_nav-profiles .nav-parent").eq(parseInt($(this).attr("sid"))).find("a").eq(0).click();
            }
            $(this).css({
              "color": "#1caf9a"
            });
            $(this).parent().siblings().find(".chactive").css({
              "color": "#94989d"
            });
          }
        });
      });
    }
  }
}]);