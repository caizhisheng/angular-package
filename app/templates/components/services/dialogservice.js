/************************
des: 弹出层公共服务
date: 2016/12/12
auth: mike
************************/
import ngApp from '../../components/app';

export default ngApp.service('dialogService',function() {

   this.modalTip = (options) => {
       layer.msg(options.msg, {
		   	time: options.time || 3000
	   });
   },

   this.modalConfirm = (options,cb) => {
    layer.confirm(options.msg, {
		  title: options.title || '提示',
		  btn: ['确定', '取消'] //按钮
	   }, function() {
	      if(cb) {
	        cb();
	       }
		}, function() {
		   //取消
	   });
   },

   this.modalAlert = (options) => {
       layer.alert(options.msg);
   },

   this.modalOpen = (options) => {
       layer.open({
          title: options.title || '提示',
    		  type: 1,
    		  skin: '', //加上边框 layui-layer-rim
    		  area: [options.width || '420px', options.height || '240px'], //宽高
    		  content: options.content || ''
       });
   },

   this.modalLoading = (options) => {
      layer.load(2, {
           shade: [0.4,'#9E9E9E']//0.1透明度的白色背景
      });
   },

   this.modalClose = () => {
      layer.closeAll();
   }
});
