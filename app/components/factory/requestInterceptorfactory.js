/************************
des: 请求统一拦截器
date: 2016/12/29
auth: mike
************************/
import ngApp from '../../components/app';

export default ngApp.factory("requestInterceptorfactory", ["$q", "dialogService", function($q, dialogService) {
    return {
        request: function(config) {
            if (config.url.indexOf(".html") < 0 && config.url.indexOf("menu") < 0 && config.url.indexOf("current-user") < 0) {
                dialogService.modalTip({
                    "msg": "请求处理中...",
                    "time": 300000
                });
            }
            return config;
        },
        requestError: function(err) {
            dialogService.modalTip({
                    "msg": "请求处理失败，请稍后重试！",
                    "time": 3000
            });
            return $q.reject(err);
        },
        response: function(res) {
            dialogService.modalTip({
                    "msg": "请求处理成功！",
                    "time": 3000
            });
            return res;
        },
        responseError: function(err) {
            dialogService.modalTip({
                    "msg": "请求处理失败，请稍后重试！",
                    "time": 3000
            });
            return $q.reject(err);
        }
    };
}]);