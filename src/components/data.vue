<template>
   <div class="data">
      <ol  class="breadcrumb">
            <li><a class="a" href="">首页</a></li>
            <li class="active">参考资料</li>
        </ol>
        <div class="data_box">
            <div class="data_title" v-for="(item,index) in data" :key="index">
                <h2 class="data_h2">{{item.title}}</h2>
                <ul  v-for="(it ,index1) in item.text" :key="index1">
                    <li><a class="data_a" href=""><span class="data_sp">{{index1+1}}.</span>{{it.te}}</a></li>
                </ul>
            </div>
        </div>
   </div>
</template>

<script>
export default {
 data(){
     return{
         data:[
             {title:'文档&社区',
             text:[
                {te:'Vue.js官方网站（中文）'},
                {te:'Vue论坛'},
                {te:'vue-router'},
                {te:'组件库'}
             ]
             },
            {title:'文章',
            text:[
                {te:'《Vue.js：轻量高效的前端组件化方案》'},
                {te:'《Vue.js 和 Webpack》(一)(二)(三)'},
                {te:'《尤小右采访》作者的采访有一些设计理念'},
                {te:'腾讯全端 AlloyTeam 团队《mvvm学习&vue实践小结》'},
                {te:'Vue + webpack 项目实践'},
                {te:'Vue.js 源码学习笔记'},
                {te:'Vue教程'}
             ]
            },
            {title:'项目',
            text:[
                {te:'《青城主题》'},
                {te:'《Cnodejs.org社区webapp》'},
                {te:'《vingojw/vue-vueRouter-webpack》'},
                {te:'Bootstrap components built with Vue.js'},
                 {te:'A blog based on Github pages by vue.js + webpack'},
                {te:'HackerNews clone with Vue.js'},
                {te:'官方示例'},
                {te:'用Vue实现的拖拽效果'},
                {te:'Chat by Vue + Webpack'},
                {te:'vue-mui'},
                {te:'laracasts'},
                {te:'Laravel-and-Vue'},
                {te:'Vue.js + Redux'},
                {te:'Vue.js + Webpack example'},
                {te:'基于Vue、Bootstrap的一套MVVM组件，简单、易用、功能强大'},
                {te:'一个php的cms，前端用vuejs'}
             ]
            },
            {title:'视频',
            text:[
                {te:'尤小右分享vuejs 数据驱动的组件化前端开发'},
                {te:'laracasts.com Vuejs1.0教程'}
             ]
            },
            {title:'技术交流',
            text:[
                {te:'Vue的聊天室'},
                {te:'Vuejs官方推特'}
             ]
            }
         ]
     }
 }
}
</script>

<style>
.data{
    margin-top: 20px;
    background: #fff;
    margin-bottom: 20px;
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
.data_h2{
border-bottom:2px solid #eee;
padding: 20px; 
font-size: 25px;
font-weight: 600;
letter-spacing: 1px;
}
.data_a{
    color: #000 !important;
    text-shadow: none!important;
    letter-spacing: 1px;
}
.data_sp{
    font-size: 14px;
    color: #369219;
    font-weight:700;
    letter-spacing: 1px; 
}
</style>
