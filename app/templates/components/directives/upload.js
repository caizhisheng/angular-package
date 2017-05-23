/************************
des: 上传附件指令
date: 2017/01/17
auth: mike
************************/
import ngApp from '../../components/app';

var _timer;
ngApp.directive('dropzone',['questfactory','dialogService',function(questfactory,dialogService) {
    return {
        restrict: 'C',
        scope: {
         "verifyed": "="
        },
        link: function(scope, element, attrs) {
            var config = {
                url: '/upload-file',
                maxFilesize: 50,
                maxThumbnailFilesize: 10,
                parallelUploads: 1,
                autoProcessQueue: true
            };

            var eventHandlers = {
                'addedfile': function(file) {
                    if($("input[name='templateNo']").val() == "") {
                      dialogService.modalTip({"msg": "请先选择一个消息模板！"});
                      this.removeFile(this.files[0]);
                      return false;
                    } else {
                      let filetype = file.name.split('.')[file.name.split('.').length-1];
                     if(filetype != "csv") {
                      this.removeFile(this.files[0]);
                      dialogService.modalTip({"msg": "请上传csv格式的文件！"});
                    } else {
                    scope.file = file;
                    if (this.files[1] != null) {
                        this.removeFile(this.files[0]);
                    }
                    scope.$apply(function() {
                        scope.fileAdded = true;
                    });
                  }
                }
                },

                'success': function (file, response) {
                     $("#uuid").val(response[0].fileUUID);
                     $("#uploadarea").hide();
                     $("#uploadverify").show();
                     _timer = setInterval(function(){scope.verifyFile(response[0].requestId)},2000);
                },

                'error' : function (file,response) {
                   //alert(111);
                  dialogService.modalAlert({"msg": "文件上传出现异常,请检查文件格式是否正确！"});
                  $("#uploadarea").show();
                  $("#uploadverify").hide();
                  $(".dz-preview").hide();
                  $(".dz-message").css({"opacity":"1"});
                  $(".dz-message").css({"filter":"alpha(opacity=100)"});
                  return false;

                }

            };

            var dropzone = new Dropzone(element[0], config);

            angular.forEach(eventHandlers, function(handler, event) {
                dropzone.on(event, handler);
            });

            scope.processDropzone = function() {
                dropzone.processQueue();
            };

            scope.resetDropzone = function() {
                dropzone.removeAllFiles();
            };
            
            scope.verifyFile = function(resid) {

              questfactory.postFile("/mdp-app/message/batch/verify?requestId="+resid+"",function(req) {
                if(req.data.code != "000000" || req.status == 500) {
                  clearInterval(_timer);
                  dialogService.modalAlert({"msg": "文件验证出现异常,请检查文件格式是否正确！"});
                  $("#uploadarea").show();
                  $("#uploadverify").hide();
                  $(".dz-preview").hide();
                  $(".dz-message").css({"opacity":"1"});
                  $(".dz-message").css({"filter":"alpha(opacity=100)"});
                  return false;
                } else {
                    if(req.data.state != "VERIFY_END") {
                    } else {
                        $("#verifytxt").html("文件校验完成,正在加载数据...");
                        scope.verifyResult(req.data.batchId,resid);
                    }
                }
              });
            };

            scope.verifyResult = function(batchId,resid) {
                $("#requestId").val(resid);
                scope.verifyed = true;
                let premsg ="";
                questfactory.get("mdp-app/message/batch/preview?batchId="+batchId+"").then(function(res){
                 premsg = (res.content == undefined ? "暂无预览信息" : res.content);
                 questfactory.get("mdp-app/api/sms-message/search/findPageByBatchIdAndIscorrect?batchId="+batchId+"&iscorrect=false&size=100&page=0").then(function(res) {
                  let _thead = "";
                  let _body = "";
                  let _errcount = res.page.totalElements;
                  if(res._embedded["sms-message"].length>0) {
                  let _tabheader = res._embedded["sms-message"][0].paramMap;
                  let _tabbody = res._embedded["sms-message"];
                  for (let item in _tabheader) {
                    _thead += '<th>'+item+'</th>';
                  }
                  _thead += '<th>总字数</th>';
                  _tabbody.map(function(bodyobj) {
                        _body += '<tr>';
                    for(let item1 in bodyobj.paramMap) {
                        if (bodyobj.verifyStateMap[item1] == "OK" || bodyobj.verifyStateMap[item1] == undefined) {
                          _body += '<td>'+bodyobj.paramMap[item1]+'</td>';
                        } else {
                          _body += '<td style="background: #ebccd1;">'+bodyobj.paramMap[item1]+'</td>';
                        }                         
                    }
                        if (bodyobj.totalWords > 72) {
                          _body += '<td style="background: #ebccd1;">'+bodyobj.totalWords+'</td>';
                        } else {
                          _body += '<td>'+bodyobj.totalWords+'</td>';
                        }
                        _body += '</tr>';
                  });

                  let _table = `<div style="min-height:200px;overflow:auto;"><table class="table table-striped mb30"><thead><tr>${_thead}</tr></thead><tbody>${_body}</tbody></table></div>`;
                  let _notice = `<div class="alert alert-danger" style="margin-top:20px;">注意：系统发现了${_errcount}条可能有问题的记录，以上列表最多显示100条错误数据。如果的确是输入问题，请检查确认无误后重新上传；如果确认不是问题请忽略错误提示。</div>`;
                  let _preview = `<div class="alert alert-success">${premsg}</div>`;
                  $("#uploadverify").hide();
                  $("#errtab").html(_table+_notice+_preview);
                 } else {
                  let _notice = `<div class="alert alert-success" style="margin-top:20px;">未发现异常数据！</div>`;
                  let _preview = `<div class="alert alert-success">${premsg}</div>`;
                    $("#uploadverify").hide();
                    $("#errtab").html(_notice+_preview);
                 }
                 $("#search_code span").html(resid);
                 $("#search_code").show();
               }); 
             });
                clearInterval(_timer);
            }
        }
    }
}]);
            