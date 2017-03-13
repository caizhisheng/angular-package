/************************
des: form数据转json
date: 2017/01/06
auth: mike
************************/

import ngApp from '../../components/app';

export default ngApp.service('formToJson', function() {
	this.toJson = (form,extendobj) => {
		var o = {};
		var a = form.serializeArray();
		$.each(a, function() {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				//过滤表单中script非法字符
				o[this.name].push(this.value.replace(/<script.*?>.*?<\/script>/ig, '') || '');
			} else {
				o[this.name] = this.value.replace(/<script.*?>.*?<\/script>/ig, '') || '';
			}
		});
		if(extendobj) {
			for(let extend in extendobj) { 
			    o[extend] = extendobj[extend]; 
			}
		}
		return o;
	}
});