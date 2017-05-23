/************************
des: 公共控制器
date: 2017/01/11
auth: mike
************************/
import ngApp from '../components/app';
import {apiConfig} from '../components/config';


export default ngApp.controller('commonCtrl', ['$scope', 'dialogService','questfactory', function($scope, dialogService,questfactory) {

	$scope.closeDialog = () => {
			dialogService.modalClose();
		},
		//获取发送人列表
		$scope.getSender = () => {
			let userArr = [];
			questfactory.get(apiConfig.user, {
				"systemCode": localStorage.syscode
				
			}).then((response) => {
				userArr.push({
					"name": "选择发送人",
					"val": ""
				});
				response._embedded.user.map(function(item) {
					let user = {};
					user.name = item.employeeName;
					user.val = item.loginName;
					userArr.push(user);
				});
			});
			$scope.userArr = userArr;
			return $scope.userArr;
		},

		//获取模板信息
		$scope.getTpl = () => {  
			let tplArr = [];
			questfactory.get(apiConfig.template, {
				"systemCode": localStorage.syscode,
				page: 0,
				size: 10000
			}).then((response) => {
				tplArr.push({
					"name": "选择模板",
					"val": ""
				});
				response._embedded.smsTemplate.map(function(item) {
					let tpl = {};
					tpl.name = item.name;
					tpl.val = item.code;
					tplArr.push(tpl);
				});
			});
			return tplArr;
		},


		//获取模板信息
		// $scope.getSysCode = () => {  
		// 	questfactory.get("/current-user").then((response) => {
		//     	localStorage.syscode = response.systemCode;
		//     	$scope.scodenum = response.systemCode;
		//     });
		//     return localStorage.syscode;
		// },

		//获取所有通道
		$scope.getChannelList = () => {
			let channelArr = [];
			questfactory.get(apiConfig.channelInfoes,null).then((response) => {
				channelArr.push({
					"name": "选择渠道",
					"val": ""
				});
				response._embedded.channelInfoes.map(function(item) {
					let channel = {};
					channel.name = item.name;
					channel.val = item.code;
					channelArr.push(channel);
				});
			});
			$scope.channelArr = channelArr;
			return $scope.channelArr;
		},

		//登出
		$scope.loginOut = () => {
	      //http://ump.wanda-dev.cn:8099/wd_sso_logout?action=exit&url=http://ump.wanda-dev.cn:8099/
		  let _outurl = location.origin+"/wd_sso_logout?action=exit&url="+location.origin+"";
          location.href = _outurl;
		}

}]);