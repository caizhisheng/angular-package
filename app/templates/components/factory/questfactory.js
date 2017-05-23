/************************
des: angular公共服务basefactory(包括获取、提交数据及异常处理等)
date: 2016/11/30
auth: mike
************************/
import ngApp from '../../components/app';

ngApp.factory("questfactory", ['$http', '$q','$location','dialogService', function($http, $q, $location, dialogService) {
  var basefactoryService = {};
  basefactoryService.handleSuccess = function(response, type) {
     if(localStorage.syscode == undefined) {
      location.reload();
      return false;
     } else {
      if (type == "POST" || type == "PUT") {
        if (response.status == "201" || response.status == "200") {
          let _alert = "请求处理成功！";
          if(response.data != "" && response.data.code != "000000" && response.data.id == undefined) {
             _alert = response.data.message;//(response.data.message == undefined ? "请求处理成功！": response.data.message);
          } else {
            setTimeout("location.reload()",2000);
          }
          dialogService.modalTip({
            "msg": _alert,
            "time": 3000
          });
        } else {
          dialogService.modalTip({
            "msg": "请求处理失败！",
            "time": 3000
          });
        }
      } else {
        return response.data;
      }
    }
     $(".btn-primary").attr("disabled",false);
    },

    basefactoryService.handleError = function(HttpResponse) {
      if(HttpResponse.status == "401") {
         location.href = HttpResponse.data.loginUrl;
        //"https://sso4pub.wanda-dev.cn/LoginLight.aspx?challengeNumber=NTkyNzU4emQ4djh3M2V2eXYyejcyMmF2bnBxM2ZxcDUyMnhnOGtneHVpNWpscmhyMmE1NGZ2cHJicmNhaXFiYmV5dGl6NDV2ZGs0MjZrYXlhZTlwcmpxejd0cHVhbnZzNzZ1Znh3eGQzYzl5bjFpZm95OGFobGhsd3Fzb3hhZzducm5sbDVmN3pvMjlvZzAzdmtmdTQ4cG1xOHg1MTFpNTY3eGxsc3psb3lsd3JwanpicTduaWswaXhndXRsY203NXlpOGNvdGhjaDY1bWNmZjJ2MXNveGdwZWZzc3N1dDJmYjV5NnhlODdtaDJwYjR0YjVxMTdxa2NvNWdscTQ5ZA==&flag=3&systemCode=GRP244&RetutnUrl=http%3A%2F%2Ftest.wanda-dev.cn:3008");
      } else if(HttpResponse.status == "403") {
         location.href = "403.html";
      } else {
      //服务器非正常响应数据;
       dialogService.modalTip({
            "msg": "请求处理失败！",
            "time": 3000
       });
      }
      $(".btn-primary").attr("disabled",false);
    },

    //restFul方式
    basefactoryService.restFulQuest = function(api,type,params,cb) {
      //post请求 restful格式将表单参数转成json格式传递
      if(type == 'GET') {
        $http({
            url: api,
            method: type,
            params: params
          })
          .then(function(res, req) {
             //console.log(res);
             cb(res);
          })
          .catch(function(HttpResponse) {
            basefactoryService.handleError(HttpResponse);
        });
      } else {
        dialogService.modalTip({
          "msg": "请求处理中...",
          "time": 300000
        });
        $http({
            url: api,
            method: type,
            data: JSON.stringify(params) || {}
          })
          .then(function(res, req) {
             cb(res);
          })
          .catch(function(HttpResponse) {
            basefactoryService.handleError(HttpResponse);
        });
      }
    },
    
    basefactoryService.get = function(api,params) {
      var def = $q.defer();
      basefactoryService.restFulQuest(api.replace(/^http:\/\/[^/]+/, ""),'GET',params,function(res) {
          def.resolve(basefactoryService.handleSuccess(res, "GET"));
      });
      return def.promise;
    },

    basefactoryService.post = function(api,params) {
      basefactoryService.restFulQuest(api.replace(/^http:\/\/[^/]+/, ""),'POST',params,function(req) {
          basefactoryService.handleSuccess(req, 'POST');
      });
    },

    basefactoryService.put = function(api,params) {
      basefactoryService.restFulQuest(api.replace(/^http:\/\/[^/]+/, ""),'PUT',params,function(req) {
          basefactoryService.handleSuccess(req, 'PUT');
      });
    },

    basefactoryService.getmock = function(api,params) {
      var def = $q.defer();
      basefactoryService.restFulQuest(api,'GET',params,function(res) {
          def.resolve(basefactoryService.handleSuccess(res, "GET"));
      });
      return def.promise;
    },

    basefactoryService.postFile = function(api,cb) {
       $http({
            url: api.replace(/^http:\/\/[^/]+/, ""),
            method: "GET"
          })
          .then(function(res, req) {
            cb(res);
          })
          .catch(function(HttpResponse) {         
             $("#uploadarea").show();
             $("#uploadverify").hide();
             $(".dz-preview").hide();
             $(".dz-message").css({"opacity":"1"});
             $(".dz-message").css({"filter":"alpha(opacity=100)"});
             $(".btn-primary").attr("disabled",false);
             dialogService.modalTip({
              "msg": "文件校验失败，请稍后重试！",
              "time": 3000
             });
             clearInterval(_timer);

        });
    },

    basefactoryService.postForm1 = function(api, params) {
      $http({
          url: api,
          method: 'POST',
          data: params || {},
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: function(obj) {
            var str = [];
            for (var p in obj) {
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
          }
        })
        .then(function(res, req) {
          basefactoryService.handleSuccess(res,'POST');
        })
        .catch(function(HttpResponse) {
          basefactoryService.handleError(HttpResponse);
        });
    },

    //普通表单提交
    basefactoryService.postForm = function(api, params) {
      $http({
          url: api,
          method: 'POST',
          data: params || {},
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
          // transformRequest: function(obj) {
          //   var str = [];
          //   for (var p in obj) {
          //     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          //   }
          //   return str.join("&");
          // }
        })
        .then(function(res, req) {
          basefactoryService.handleSuccess(res,'POST');
        })
        .catch(function(HttpResponse) {
          basefactoryService.handleError(HttpResponse);
        });
    },

    basefactoryService.putForm = function(api, params) {
      $http({
          url: api,
          method: 'PUT',
          data: params || {},
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: function(obj) {
            var str = [];
            for (var p in obj) {
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
          }
        })
        .then(function(res, req) {
          basefactoryService.handleSuccess(res,'POST');
        })
        .catch(function(HttpResponse) {
          basefactoryService.handleError(HttpResponse);
        });
    }
  return basefactoryService;
}]);