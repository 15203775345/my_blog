<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
    <div @click="gotoUp" class="backtotop">回到顶部</div>
  </div>
</template>
<script>
$(document).ready(function(){
      $(window).scroll(function(){
	   // 获取滚动条到顶部的垂直高度
		  let heightH =$(window).scrollTop();
	   if(heightH<100){
		   $(".backtotop").css("display","none")
	   }else{
       $(".backtotop").css("display","block")
	   }
	 })
 
  });
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
      	// 返回顶部
		gotoUp(){
			$('body,html').animate({
		   	scrollTop:0
		  },300);
		},
  }
}
</script>

<style>
*{
   margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
ul{
  list-style: none;
}
a{
  text-decoration: none;
}
ol, ul {
    margin-top: 0;
    margin-bottom: 0px !important;
}
.backtotop{
  width: 20px;
  position: fixed;
  right: 0;
  top:70%;
  background:grey;
  padding: 20px 0px;
  text-align: center;
 color: aliceblue;
 border-radius:5px 0px 0px 5px; 
 display: none;
 cursor: pointer;
}
.breadcrumb{
     padding:15px !important;
    list-style: none !important;
    background-color: #ddd !important;
    border-radius: 10px 10px 0px 0px !important;
}
.a{
   color: #369219;
}
@media (max-width: 768px) {
  .body {
    width: 100%;
    overflow: hidden;
  }
  .li_h4{
    overflow: hidden;
  }
}
.col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9 {
    position: relative;
    min-height: 1px;
    padding-right: 5px !important;
    padding-left: 5px !important;
}
</style>
