// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
Vue.prototype.axios = axios;
import store from './vuex/user'
import  Api from '../src/api/api'
import  Fun from '../src/api/function.js'
Vue.use(Api,Fun)
Vue.config.productionTip = false
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
/* eslint-disable no-new */
// 文字长度过滤器
Vue.filter('change_text',function(str,num){
   if( str.length<=num){
    return str
   }
    if(str.length>num){
      return str.substr(0,num-1)+'...'
    }
})
// 时间格式化过滤器
Vue.filter('replyTime',function(value){
  if (!value) {
    return ''
  }
  let date = new Date(value)
  let time = new Date().getTime() - date.getTime() // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return ''
  } else if ((time / 1000 < 30)) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + '秒前'
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前'
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前'
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前'
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '月前'
  } else {
    return parseInt(time / 31536000000) + '年前'
  }
})
// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (localStorage.user) {
  store.dispatch('setUserInfo', JSON.parse(localStorage.user))
}
// vue跳转新页面后回到顶部
router.afterEach((to,from,next)=>{
  　　　　window,scrollTo(0,0)
  　　})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
