/************************
des: 列表、分页指令
date: 2016/12/01
auth: mike
************************/
import ngApp from '../../components/app';

ngApp.directive('ngTable', ['$filter','$sce','questfactory', function($filter,$sce,questfactory) {
  return {
    restrict: "E",
    templateUrl: "../../build/html/components/table_tpl.html",
    scope: {
      columns: '=',
      url: '=',
      mockurl: '=',
      param: '=param',
      actions: '=',
      catalog: '=',
      ispage: '=',
      isallowpager:'='
    },
    replace: false,
    link: ($scope, $element, attrs) => {
      $scope.trs = $scope.columns;
      $scope.loading = true;
      let isAllowPage = $scope.isallowpager;
      let [_url, range] = [];
      if ($scope.mockurl == undefined) {
        [_url, range] = [$scope.url, []];
      } else {
        [_url, range] = [$scope.mockurl, []];
      }
      //let star = 0;
      $scope.pageNum = 1;
      $scope.getPagerData = (pageNum, oldval) => {
        $scope.param.page = pageNum - 1; //当前页码
        let size = $scope.param.size; //每页显示条数
        if(location.hash == "#/channel") {
          //由于接口不规范，此处特殊处理--短信渠道管理
          _url = "/sms-app/channelAccount/find?channelCode="+$scope.url+"";
        }
        questfactory.get(_url, $scope.param).then((response) => {
          if ($scope.mockurl != undefined) {
            $scope.datalist = response;
            $scope.isPager = false; //mock数据不支持分页
          } else {
            let newresponse;
            if (response._embedded == undefined) {
              newresponse = response[$scope.catalog];
            } else {
              newresponse = response._embedded[$scope.catalog];
            }

            //循环处理添加过滤器
            angular.forEach($scope.trs, function(ele, i) {
                angular.forEach(newresponse, function(el, index) {
                 if (ele.filter) {
                    el[ele.attribute] = $sce.trustAsHtml("<span>"+$filter(ele.filter)((newresponse[index][ele.attribute] == null ? "" : newresponse[index][ele.attribute]))+"</span>");
                 } else {
                    el[ele.attribute] = $sce.trustAsHtml("<span>"+(el[ele.attribute] == null ? "" : el[ele.attribute])+"</span>");
                 }
                });

              // if(ele.outlinkTree) {
              //   angular.forEach(response._embedded[$scope.catalog], function(el, index) {
              //       //发起外部请求获得数据
              //       questfactory.get(el._links.channelConfigs.href, null).then((response) => {
              //          el[ele.attribute] =  response._embedded[ele.outlinkTree][index];
              //       });
              //   });
              // }
            });

            $scope.datalist = newresponse;
            $scope.loading = false;
            //console.log(isAllowPage);
            if (response.page == undefined || isAllowPage == false) {
              //console.log(12999091);
              $scope.isPager = false;
            }
            $scope.pageTotal = (response.page == undefined ? 1 : response.page.totalElements); //更新总数据条数
            $scope.totaPages = Math.ceil($scope.pageTotal / size); //总页数
            $scope.pageNum = pageNum; //当前页码

            $scope.range = $scope.pagerCalculate(pageNum, $scope.totaPages, 10);
            // $scope.range = ($scope.range.length == 0 ? $scope.range = [1] : $scope.range);
            $(".table tbody").show();
            $(".dataTables_paginate").show();
            $(".pageindex").show();
            localStorage.removeItem("rsrid");
          }
        });
      };

      $scope.setRang = (starNum, endNum) => {
          let i;
          for (i = starNum; i <= endNum; i++) {
            range.push(i);
          }
          //console.log(range);
        },

        $scope.nextPager = () => {
          $scope.ispage = true;
          if ($scope.pageNum < $scope.totaPages) {
            $scope.pageNum = $scope.pageNum + 1;
          }
        },

        $scope.prePager = () => {
          $scope.ispage = true;
          if ($scope.pageNum > 1) {
            $scope.pageNum = $scope.pageNum - 1;
          }
        },

        $scope.firstPager = () => {
          $scope.ispage = true;
          $scope.pageNum = 1;
        },

        $scope.lastPager = () => {
          $scope.ispage = true;
          $scope.pageNum = $scope.totaPages;
        },

        $scope.changepager = (pageNum) => {
          $scope.ispage = true;
          $scope.pageNum = pageNum;
        },

        $scope.pagerCalculate = (current, length, displayLength) => {
          var low,
            high,
            v;

          let indexes = [];

          if (length == 0) {
            return;
          }
          if (current > length) {
             current = 1;
          }

          if (length <= displayLength) {
            low = 1;
            high = length;
          } else {
            v = Math.ceil(displayLength / 2);
            low = Math.max(current - v, 1);
            high = Math.min(low + displayLength - 1, length);

            if (length - high < v) {
              low = high - displayLength + 1;
            }
          }

          for(; low <= high; low++) {
            indexes.push(low);
          }
          return indexes;

        },

        $scope.compareObject = (o1, o2) => {
          if (typeof o1 != typeof o2) return false;
          if (typeof o1 == 'object') {
            for (var o in o1) {
              if (typeof o2[o] == 'undefined') return false;
              if (!$scope.compareObject(o1[o], o2[o])) return false;
            }
            return true;
          } else {
            return o1 === o2;
          }
       },

        //监控分页的变化请求数据
        $scope.$watch('pageNum', (newval, oldval) => {
          range = [];
          $scope.loading = true;
          //$scope.datalist = null;
          $(".table tbody").hide();
          $(".dataTables_paginate").hide();
          $(".pageindex").hide();
          $scope.getPagerData($scope.pageNum, oldval);
        });

        //监控查询参数
        $scope.$watch('param', function(page, oldpage) {
          if($scope.ispage == false && (!$scope.compareObject(page,oldpage) || !$scope.compareObject(oldpage,page))) {
            $scope.getPagerData(1, 0);
          }
        }, true);
    }
  }
}]);
