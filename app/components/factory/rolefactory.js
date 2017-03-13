/************************
des: angular公共服务-用户权限过滤
date: 2016/12/21
auth: mike
************************/
import ngApp from '../../components/app';

export default ngApp.factory("rolefactory",['$rootScope','questfactory',function($rootScope,questfactory) {
   let rolefactoryService = {};
   let userRole = [];

   rolefactoryService.getUserRoles = () => {
     //请求接口-获得用户登录信息
     let _menuApi = "/current-user";
     questfactory.get(_menuApi).then((response) => {
         $rootScope.userInfo = response;
         localStorage.syscode = response.systemCode;
         //$rootScope.$broadcast("syscodecast",response.systemCode); //广播systemCode 便于控制器之间调用
     });
   },

   //页面过滤
   rolefactoryService.isUrlAccessibleForUser = (uid) => {
     return true;
   },

   //获取菜单
   rolefactoryService.getUserMenu = () => {
     let _menuApi = "api/menu?page=0&size=100&sort=menuDisplayOrder,asc";
     questfactory.get(_menuApi,{}).then((response) => {
         $rootScope.usermenus = response._embedded.menu;
     });
   }
  return rolefactoryService;
}]);
