/************************
des: angular路由服务routerprovider(路由注入)
date: 2016/11/30
auth: mike
************************/
import ngApp from '../../components/app';

ngApp.provider("routerprovider",['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
	    $urlRouterProvider.when("", "/messagetpl");//默认启动页 
        $stateProvider
        .state("messagetpl", {
        	//params: {} 传参
            url: "/messagetpl",
            templateUrl: "build/html/messagetpl/index.html"
        }).state("/messagetpl/create", {
            params: {"updateurl":null},
            url: "/messagetpl/create",
            templateUrl: "build/html/messagetpl/create.html"
        }).state("/messagetpl/edit/:id", {
            params: {"updateurl":null},
            url: "/messagetpl/edit/:id",
            templateUrl: "build/html/messagetpl/edit.html"
        }).state("messagesend", {
            url: "/messagesend",
            templateUrl: "build/html/messagesend/index.html"
        }).state("role", {
            url: "/role",
            templateUrl: "build/html/roles/index.html"
        }).state("account", {
            url: "account",
            templateUrl: "build/html/account/index.html"
        }).state("sendlog", {
            url: "/sendlog",
            templateUrl: "build/html/sendlogs/index.html"
        }).state("sendlogmore", {
            url: "/sendlogmore",
            templateUrl: "build/html/sendlogs/more.html"
        }).state("user", {
            url: "/user",
            templateUrl: "build/html/users/index.html"
        }).state("channel", {
            url: "/channel",
            templateUrl: "build/html/channel/index.html"
        }).state("/channel/routeconfig", {
            url: "/channel/routeconfig",
            templateUrl: "build/html/channel/routeconfig.html"
        }).state("/channel/createroute", {
            url: "/channel/createroute",
            templateUrl: "build/html/channel/createroute.html"
        }).state("/channel/editroute/:id", {
            params: {"updateurl":null},
            url: "/channel/editroute/:id",
            templateUrl: "build/html/channel/editroute.html"
        }).state("/app/sendtpl", {
            url: "/app/sendtpl",
            templateUrl: "build/html/appsend/sendtpl/index.html"
        }).state("/app/sendlog", {
            url: "/app/sendlog",
            templateUrl: "build/html/appsend/sendlogs/index.html"
        }).state("/app/senduser", {
            url: "/app/senduser",
            templateUrl: "build/html/appsend/senduser/index.html"
        }).state("/app/sendchart", {
            url: "/app/sendchart",
            templateUrl: "build/html/appsend/sendchart/index.html"
        }).state("/app/manualconfig", {
            url: "/app/manualconfig",
            templateUrl: "build/html/appsend/sendconfig/manualconfig.html"
        }).state("/app/triggerconfig", {
            url: "/app/triggerconfig",
            templateUrl: "build/html/appsend/sendconfig/triggerconfig.html"
        }).state("/app/sendtpl/create", {
            url: "/app/sendtpl/create",
            templateUrl: "build/html/appsend/sendtpl/create.html"
        }).state("/app/sendtpl/edit/:id", {
            params: {"updateurl":null},
            url: "/app/sendtpl/edit/:id",
            templateUrl: "build/html/appsend/sendtpl/edit.html"
        }).state("/app/senduser/create", {
            url: "/app/senduser/create",
            templateUrl: "build/html/appsend/senduser/create.html"
        }).state("/msgsend/chart", {
            url: "/msgsend/chart",
            templateUrl: "build/html/messagesend/chart.html"
        });
        
	    this.$get = function() {
           return {
            }
        }            

}]);



