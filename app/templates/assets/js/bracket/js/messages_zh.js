(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "../jquery.validate"], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: ZH (Chinese, 涓枃 (Zh艒ngw茅n), 姹夎, 婕㈣獮)
 */
$.extend($.validator.messages, {
      required: "*请填写正确的信息！",
      remote: "请修正该字段",
      email: "请输入正确格式的电子邮件",
      url: "请输入合法的网址",
      date: "请输入合法的日期",
      dateISO: "请输入合法的日期 (ISO).",
      number: "请输入合法的数字",
      digits: "只能输入整数",
      creditcard: "请输入合法的银行卡号",
      equalTo: "*两次密码输入不一致！",
      accept: "请输入拥有合法后缀名的字符串",
      maxlength: jQuery.validator.format("长度最多是 {0}位"),
      minlength: jQuery.validator.format("长度最少是 {0}位"),
      rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
      range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
      max: jQuery.validator.format("请输入一个最大为{0} 的值"),
      min: jQuery.validator.format("请输入一个最小为{0} 的值")
});

}));