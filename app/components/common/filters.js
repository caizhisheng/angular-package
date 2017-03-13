/************************
des: html输出过滤器、服务
date: 2017/01/06
auth: mike
************************/

import ngApp from '../../components/app';

export default ngApp.filter('htmlFilter', ['$sce', function($sce) {
return function(html) {
   return $sce.trustAsHtml(html);
}
}]).filter('tpFilter', function() { //消息类型过滤
return function(tpcode) {
   let tpname = "";
   switch (tpcode) {
      case "SYSTEM":
         tpname = "通知";
         break;
      case "OTP":
         tpname = "OTP";
         break;
      case "SALES":
         tpname = "营销";
         break;
   }
   return tpname;
}
}).filter('tpSendFilter', function() { //消息发送状态过滤
return function(sendcode) {
   let tpname = "";
   switch (sendcode) {
      case "RECEIVED":
         tpname = "已接收";
         break;
      case "BAD_MESSAGE":
         tpname = "未知";
         break;
      case "SENDED":
         tpname = "发送成功";
         break;
      case "FAIL":
         tpname = "发送失败";
         break;
   }
   return tpname;
}
}).filter('urlFilter', function() { //url过滤
   return function(url) {
      return url.replace(/^http:\/\/[^/]+/, "");
   }
}).filter('autoAllocateFilter', function() { //url过滤
   return function(autocode) {
      let autoname = "";
      switch (autocode) {
         case false:
         autoname = "否";
         break;
         case true:
         autoname = "是";
         break;
      }
      return autoname;
   }
}).filter('accountFilter', function() { //可用账户信息过滤
   return function(accountobj) {  
      let accountStr = "";
      accountobj.map(function(item) {
          accountStr += item.name+":";
       item.channelAccountModelList.map(function(item1) {
          accountStr += item1.userName+";"+" \n\r ";
       });
      });
      return accountStr;
   }
}).filter('sendFilter', function() { //可用账户信息过滤
   return function(sendstate) {    
    let _state = "";
      switch (sendstate) {
         case "ACCEPTED":
         _state = "接收到请求";
         break;
         case "VERIFYING":
         _state = "验证中";
         break;
         case "SEND_PROGRESSING":
         _state = "发送中";
         break;
         case "FINISHED":
         _state = "发送处理完毕";
         break;
         case "VERIFY_END":
         _state = "验证完毕";
         break;
      }
      return _state;
   }
}).filter('sendStatusFilter', function() { 
   return function(sendstatus) { 
      let sendstatusobj = sendstatus;
      let _status = "";
      _status += "成功:"+ (sendstatusobj.SUCCESS == undefined ? 0 : sendstatusobj.SUCCESS) +"条";
      _status += " ";
      _status += "失败:"+ (sendstatusobj.FAILED == undefined ? 0 : sendstatusobj.FAILED) +"条";
      _status += " ";
      _status += "发送中:"+ (sendstatusobj.PROCESSING == undefined ? 0 : sendstatusobj.PROCESSING) +"条";
      return _status;   
   }
}).filter('tplNameFilter', function() { //模板名称
   return function(tplname) { 
      let tplobj = tplname;
      return tplobj.name;   
   }
}).filter('tplTypeFilter', function() { //模板类型
   return function(tpltype) { 
      let tplobj = tpltype;
      if(tpltype == "" || tpltype == null) {
         return "";
      } else {
         return (tpltype == "SYSTEM" ? "通知" : tpltype == "OTP" ? "OTP" : "营销"); 
      }       
   }
}).filter('contLengthFilter', function() { //消息字数
   return function(contlength) { 
      if(contlength == null) {
         return 0;
      } else {
         return contlength.length;
      }
   }
}).filter('sendDetailFilter', function() { //消息字数
   return function(senddetail) { 
      let _detail = "";
      senddetail.map(function(item) {
         _detail += item.createdAt + "  "+ (item.sendStatus == "SUCCESS" ? "成功" : "失败") + "通道信息:"+ "漫道科技, md_acct3";
      });
       return _detail;
   }
}).filter('userStatusFilter', function() { //用户账号状态
   return function(userstate) { 
     let _state = "";
      switch (userstate) {
         case true:
         _state = "已禁用";
         break;
         case false:
         _state = "正常";
         break;
      }
      return _state;
   }
}).filter('strSubFilter',['$sce',function($sce) {
   return function(str) { 
      if(str == null || str == "") {
         return "";
      } else {
         return $sce.trustAsHtml((str.length > 12 ? str.substring(0,12)+"<i class='text-more' msg-text='"+str+"' onclick='showMoreTxt($(this))'></i>" : str));
      }
   }
}]).filter('pushFilter', function() { //app推送类型
   return function(categorytype) { 
     let _state = "";
      switch (categorytype) {
         case 1:
         _state = "我的消息";
         break;
         case 2:
         _state = "平台公告";
         break;
         case 3:
         _state = "活动精选";
         break;
      }
      return _state;
   }
});
