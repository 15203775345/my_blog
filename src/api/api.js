// base.js定义全局函数
exports.install = function(Vue,option){
    Vue.prototype.ajaxUrl = "https://www.vue-js.com";
    // Vue.prototype.AjaxUrl = "https://www.apiopen.top";
    // 封装axios
    Vue.prototype.sendAjax = function(type,url,data,success,error){
        var type = type || 'post';
        var url = this.ajaxUrl+"/api/v1/"+ url;		// 请求地址
		var data = data || null;						// 要传的数据
		var success = success || function (res) {
		 console.log(res);
    };
		var error = error || function (err) {
			console.log(err);
      };
      this.axios({
        method:type,
        url:url,
        data:data,
        // headers:{
        //     ip:localStorage.getItem("userIp"),
        //     userid:localStorage.getItem("userId"),
        //     tokenString:localStorage.getItem("usertoken")
        // }
    }).then(success).catch(error)
    }
 
}