/************************
des: 自定义验证
date: 2016/12/14
auth: mike
************************/

import ngApp from '../../components/app';

let IdentityCodeValid = (code) => {
          const city = {
		    11: "北京",
		    12: "天津",
		    13: "河北",
		    14: "山西",
		    15: "内蒙古",
		    21: "辽宁",
		    22: "吉林",
		    23: "黑龙江",
		    31: "上海",
		    32: "江苏",
		    33: "浙江",
		    34: "安徽",
		    35: "福建",
		    36: "江西",
		    37: "山东",
		    41: "河南",
		    42: "湖北",
		    43: "湖南",
		    44: "广东",
		    45: "广西",
		    46: "海南",
		    50: "重庆",
		    51: "四川",
		    52: "贵州",
		    53: "云南",
		    54: "西藏",
		    61: "陕西",
		    62: "甘肃",
		    63: "青海",
		    64: "宁夏",
		    65: "新疆",
		    71: "台湾",
		    81: "香港",
		    82: "澳门",
		    91: "国外"
           };
	  let tip = "";
	  let pass = true;

	  if (!code || !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(code)) {
	    tip = "身份证号格式错误";
	    pass = false;
	  } else if (!city[code.substr(0, 2)]) {
	    tip = "地址编码错误";
	    pass = false;
	  } else {
	    //18位身份证需要验证最后一位校验位
	    if (code.length == 18) {
	      code = code.split('');
	      //∑(ai×Wi)(mod 11)
	      //加权因子
	      let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
	      //校验位
	      let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
	      let sum = 0;
	      let ai = 0;
	      let wi = 0;
	      for (let i = 0; i < 17; i++) {
	        ai = code[i];
	        wi = factor[i];
	        sum += ai * wi;
	      }
	      let last = parity[sum % 11];
	      if (parity[sum % 11] != code[17]) {
	        tip = "校验位错误";
	        pass = false;
	      }
	    } else {
	      pass = false;
	    }
	  }
	  return pass;
}

let IdentityInputValid = (str,indentityLeth) => {
   // let i,len,code;
   // if(str == null || str == "") return false;
    let len = str.length;
   // for(i=0;i<len;i++) {
   // 	 code = str.charCodeAt(i);
   // 	 if(code > 255) {
   // 	 	len ++;
   // 	 }
   // }
   if(len > indentityLeth) {
   	return false;
   } else {
   	return true;
   }
}


let PassEqulValid = (pass,aginpass) => {
   if(pass != aginpass) {
   	return false;
   } else {
   	return true;
   }
}




export default ngApp.service('validatorService',function() {

	this.init = () => {
    
    //==================常用表单验证===================//

    // 禁止输入空格
    jQuery.validator.addMethod("noEmpty", function(value, element) {
      let empty = /\s/;
      return this.optional(element) || (!empty.test(value));
    }, "*输入条件中禁止有空格!");


    // 手机号码验证
    jQuery.validator.addMethod("isMobile", function(value, element) {
      let length = value.replace(/\s+$|^\s+/g, "").length;
      let mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
      return this.optional(element) || (length == 11 && mobile.test(value.replace(/\s+$|^\s+/g, "")));
    }, "*请正确填写您的手机号码!");

    //身份证验证
    jQuery.validator.addMethod("isCardId", function(value, element) {

      return IdentityCodeValid(value);

    }, "*请正确填写您的18位身份证号码!");

    // 邮箱验证
    jQuery.validator.addMethod("isEmail", function(value, element) {
      let length = value.replace(/\s+$|^\s+/g, "").length;
      let email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return this.optional(element) || email.test(value.replace(/\s+$|^\s+/g, ""));
    }, "*请正确填写您的邮箱地址!");

    // 银行卡验证
    jQuery.validator.addMethod("isBank", function(value, element) {
      let length = value.replace(/\s+$|^\s+/g, "").length;
      let bank = /^(998801|998802|622525|622526|435744|435745|483536|528020|526855|622156|622155|356869|531659|622157|627066|627067|627068|627069)\d{10}$/;
      return this.optional(element) || bank.test(value.replace(/\s+$|^\s+/g, ""));
    }, "*请正确填写您的银行卡信息!");

    // 电信手机号过滤
    jQuery.validator.addMethod("dxMobile", function(value, element) {
      let length = value.replace(/\s+$|^\s+/g, "").length;
      let dxmob = /^(133|153|173|177|180|181|189)\d{8}$/;
      return this.optional(element) || (length == 11 && dxmob.test(value.replace(/\s+$|^\s+/g, "")));
    }, "*请输入正确的电信手机号!");

    // 验证两次输入值是否不相同
	// jQuery.validator.addMethod("passEqual", function(value, element) {
	//  return PassEqulValid(value,$("#password").val());

 //    }, "*两次密码输入不一致!");
	//  jQuery.validator.addMethod("passEqual2",function(value, element){
	//     var returnVal = true;
	//     var id = $(element).attr("data-rule-passequal");
	//     var targetVal = $(id).val();
	//     if(value != targetVal){
	//         returnVal = false;
	//     }
	//     return returnVal;
	// },"*两次密码输入不一致!");

    
    //模板名称
    jQuery.validator.addMethod("tplValid", function(value, element) {

      return IdentityInputValid(value,20);

    }, "*模板名称不超过20位!");

    //备注类型长度验证
    jQuery.validator.addMethod("msgContValid", function(value, element) {

      return IdentityInputValid(value.replace("{","").replace("$","").replace("}",""),500);

    }, "*模板内容不超过500位!");

    jQuery.validator.addMethod("msgRemakValid", function(value, element) {

      return IdentityInputValid(value,500);

    }, "*说明内容不超过500位!");


    jQuery.validator.addMethod("userNameValid", function(value, element) {

      return IdentityInputValid(value,20);

    }, "*用户名不超过20位!");

    jQuery.validator.addMethod("realNameValid", function(value, element) {

      return IdentityInputValid(value,20);

    }, "*真实姓名不超过20位!");


    jQuery.validator.addMethod("passValid", function(value, element) {

      return IdentityInputValid(value,20);

    }, "*密码不超过20位!");

    jQuery.validator.addMethod("channelAccountValid", function(value, element) {

      return IdentityInputValid(value,20);

    }, "*用户名不超过20位!");

    

  }
});