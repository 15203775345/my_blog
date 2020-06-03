<template>
  <div class="nav">
    <div class="nav_top">
      <div class="nav_left">
        <a class="brand in_i" href>
          <img src="../assets/vue.png" alt />Vue.js
        </a>
        <!-- <a class="brand1" href>
          <img src="../assets/cnode.svg" alt />
        </a> -->
      </div>
      <div class="nav_right">
        <ul>
          <li>
            <router-link to="index">首页</router-link>
          </li>
          <li v-show="this.$store.state.userInfo.token">
            <router-link to="no_read"><span class="label label-info"></span>未读消息</router-link>
          </li>
          <li v-show="this.$store.state.userInfo.token">
            <router-link to="Collection">Cnode.js收藏</router-link>
          </li>
          <li data-toggle="modal" data-target=".bs-example-modal-lg">
            <router-link to>微信公众号</router-link>
          </li>
          <li>
            <router-link to="data">参考资料</router-link>
          </li>

          <li>
            <router-link to="about">关于</router-link>
          </li>
          <li>
            <router-link to="index">设置</router-link>
          </li>
          <li v-show="nologin">
            <router-link to="login">登录</router-link>
          </li>
          <li v-show="login" @click="out_login">
            <router-link to>退出登录</router-link>
          </li>
        </ul>
      </div>
    </div>
     
     <!-- 导航移动端 -->
     <div style="display:none" class="nav_mo">
       <div class="mo">
            <div class="mo_logo">
               <a  class="mo_a" href>
              <img class="mo_img" src="../assets/vue.png" alt />Vue.js社区
            </a>
             <a v-show="isshow===true"  @click="nav_none" class="mo_a1">
               </a>
                 <img  v-show="isshow===true"  @click="nav_none" class="mo_a1" src="../assets/btnClose.png" alt="">
                <img  v-show="isshow===false" @click="nav_block" class="mo_a1" src="../assets/btn.png" alt="">
            </div>
             <transition 
             name="bounce" 
             >
            <div class="mo_nav" v-show="isshow">
          <ul class="no_ul">
          <li>
            <router-link to="index">首页</router-link>
          </li>
          <li v-show="this.$store.state.userInfo.token">
            <router-link to="no_read"><span class="label label-info"></span>未读消息</router-link>
          </li>
          <li v-show="this.$store.state.userInfo.token">
            <router-link to="Collection">Cnode.js收藏</router-link>
          </li>
          <li data-toggle="modal" data-target=".bs-example-modal-lg">
            <router-link to>微信公众号</router-link>
          </li>
          <li>
            <router-link to="data">参考资料</router-link>
          </li>

          <li>
            <router-link to="about">关于</router-link>
          </li>
          <li v-show="nologin">
            <router-link to="login">登录</router-link>
          </li>
          <li v-show="login" @click="out_login">
            <router-link to>退出登录</router-link>
          </li>
        </ul>
            </div>
             </transition>
       </div>
     </div>
    <!-- 微信公众号模态框 -->
    <div
      style="margin-top:25px"
      class="modal fade bs-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="model_box">
            <img class="model_img" src="../assets/ma.png" alt />
            <div class="model_text">
              <p>还没有找到组织?</p>
              <p>公众号回复"1"极速找到组织</p>
              <p>关注即可获取前端进阶视频一套</p>
              <p>＋ 全网最全前端电子书一套</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="body_box">
      <div class="body">
        <div class="row no-gutters row1">
          <div class="col-lg-9 col-md-8 col-sm-12 col-xs-12">
            <router-view></router-view>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
            <div class="body_right">
              <div v-show="nologin" class="log">
                <p class="vue_">Vue：Vue.js专业中文社区</p>
                <p class="login">您可以 登录 或 注册 , 也可以</p>
                <button @click="login_" type="button" class="btn btn-info">通过 accesstoken 登录</button>
              </div>
              <div v-show="login" class="user_box">
                <div class="log">
                  <p style="color:green">个人信息</p>
                  <div class="user" @click="go_user">
                    <img :src="user.avatar_url" alt />
                    <p class="user_p">{{user.loginname}}</p>
                  </div>
                  <p>积分:{{user.score}}</p>
                  <p>用户创建时间:{{user.create_at |replyTime}}</p>
                </div>
                <div class="send">
                  <button @click="Release" type="button" class="btn btn-success">发布话题</button>
                </div>
              </div>
              <!-- 作者信息 -->
              <div v-show="ZZ" class="log" style="margin-top:20px;">
                <p style="color:green">作者</p>
                <div class="user">
                  <img :src="thord.avatar_url" alt />
                  <p class="user_p">{{thord.loginname}}</p>
                </div>
                <p>"这家伙很懒。什么都没留下!"</p>
              </div>
              <div class="log imgs">
                <img
                  class="vue_img"
                  src="../assets/luoli.jpg"
                  alt
                />
              </div>
              <div class="Cnode">
                <div class="node_all">
                  <div class="node_P">Cnode.js社区话题</div>
                  <div @click="change" class="change">换一批</div>
                </div>
                <div class="node" v-for="(node,index) in nodelist" :key="index">
                  <div @click="node_detail(node.id)" class="node_title">
                    <span style="color:red" v-show="node.tab==='share'" class="node_s">分享</span>
                    <span style="color:blueviolet" v-show="node.tab==='ask'" class="node_s">问答</span>
                    <span style="color:blue" v-show="node.tab==='job'" class="node_s">招聘</span>
                    <span style="color:pink" v-show="node.good" class="node_s">精华</span>
                    {{node.title | change_text(23)}}
                  </div>
                  <img class="node_img" :src="node.author.avatar_url" alt />
                </div>
              </div>
               <!-- <div class="log imgs">
                <img
                  class="vue_img"
                  src="../assets/luoli.jpg"
                  alt
                />
              </div> -->
             <div class="youqing">
            
            </div>
             </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer_center">
        <div style="padding-top:20px;">
          <img class="foot-img" src="../assets/vue.png" alt />
          <span class="vue">Vue.js社区</span>
        </div>

        <div class="cnode_box" style="padding-top:10px;">
          <img class="cnode1" src="../assets/cnode.svg" alt />
          <div class="tell">@2019年11月10日重构--Mr.chen</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// $(function () {
//     alert(123);
//  });
export default {
  inject: ["reload"],
  data() {
    return {
      nologin: false,
      login: false,
      ZZ: false,
      thord: [],
      nodelist: [],
      pageNum: 1,
      timer: "",
      user: "",
      isshow:false,
      T:'电话是多少'
    };
  },
  methods: {
    out_login() {
      if (confirm("确定退出登录？") == true) {
        this.$router.push({ path: "index" });
      } else {
        return false;
      }
      localStorage.removeItem("user");
      location.reload();
    },
    Release() {
      this.$router.push({ path: "create" });
    },
    login_() {
      this.$router.push({ path: "login" });
    },
    // 换一批
    change() {
      if (this.pageNum === 100) {
        this.pageNum = 1;
      } else {
        this.pageNum++;
        let PageNumber = this.pageNum;
        this.axios
          .get("https://cnodejs.org/api/v1/topics", {
            params: {
              page: PageNumber,
              limit: 8
            }
          })
          .then(res => {
            //  console.log(res)
            this.nodelist = res.data.data;
          });
      }
//     this.$store.commit('increment')
// console.log(this.$store.state.count)
// console.log(this.$store.getters.doneTodos)
    },
    // 去cnode详情
    node_detail(id) {
      this.$router.push({
        path: "/cnode",
        query: { id: id }
      }),
        this.reload();
    },
    //    去用户详情
    go_user() {
      this.$router.push({ path: "/user" });
    },
    nav_none(){
      this.isshow =false
    },
    nav_block(){
      this.isshow = true
    }
  
  },
  created() {
    if (!this.$store.state.userInfo.token) {
      (this.nologin = true), (this.login = false);
    } else {
      (this.nologin = false), (this.login = true);
    }
    this.change();
    window.setInterval(() => {
      setTimeout(this.change(), 0);
    }, 10000);

    if (this.$store.state.userInfo.userId) {
      this.axios
        .get(
          "https://www.vue-js.com/api/v1/user/" +
            this.$store.state.userInfo.loginname
        )
        .then(res => {
          this.user = res.data.data;
          //   console.log(res)
        });
    }
    this.$store.commit('t',this.T)
    console.log(this.$store.state.s)
  },
  beforeDestroy() {
    clearInterval();
  },
  mounted() {
    this.axios
      .get("https://cnodejs.org/api/v1/topics", {
        params: {
          limit: 8
        }
      })
      .then(res => {
        //  console.log(res)
      });
  },
  
};
</script>

<style>
.in_i{
  /* border: solid 2px red; */
  color:#fff;
animation: myfirst 3s infinite;
}
@keyframes myfirst{
  0% {   color:  red;}
  25% {   color:yellowgreen;}
  50% {   color:blueviolet;}
  75% {   color:#fff;}
  100% {   color:yellow;}
}
.nav {
  width: 100%;
  height: 55px;
  background: #1c6132;
}
.nav_top {
  width: 80%;
  margin: 0 auto;
  height: 55px;
}
.brand {
  line-height: 55px;
  height: 55px;
  display: block;
  color: aliceblue;
  float: left;
  font-size: 20px;
  font-weight: 200;
  text-shadow: 0 1px 0 #fff;
  padding-right: 20px;
  letter-spacing: 2px;
  height: 55px;
}
.brand1 {
  line-height: 55px;
  height: 55px;
  display: block;
  color: aliceblue;
  float: left;
  font-size: 20px;
  font-weight: 200;
  text-shadow: 0 1px 0 #fff;
  padding-left: 20px;
  letter-spacing: 2px;
  height: 55px;
}

.brand img {
  height: 45px;
}
.brand1 img {
  height: 30px;
}
.nav_right {
  float: right;
}
.nav ul {
  display: flex;
}
.nav ul li > a {
  height: 55px;
  line-height: 55px;
  color: #fff;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 13px;
  text-shadow: 1px 1px 1px #000;
}
.nav ul li a:hover {
  text-decoration: none;
}
.log {
  text-align: left;
  padding: 10px 10px;
  background: #fff;
}
.vue_img {
  height: 100%;
  width: 100%;
  vertical-align: middle;
  border: 0;
  background-size: 100%;
}
.imgs {
  margin-top: 20px;
}
.body_box {
  background: #eee;
}
.body {
  width: 80%;
  margin: 0 auto;
}
.row1 {
  margin-right: 0px !important;
  margin-left: 0px !important;
}
.body_right {
  margin-top: 20px;
}
.user {
  display: flex;
  cursor: pointer;
}
.user img {
  height: 50px;
  vertical-align: middle;
  border-radius: 5px;
}
.user_p {
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  letter-spacing: 1px;
}
.send {
  background: #fff;
  margin-top: 20px;
  padding: 10px;
}
.footer {
  width: 100%;
  height: 160px;
  background: #1c6132;
}
.footer_center {
  width: 80%;
  margin: 0 auto;
}
.model_box {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
}
.model_img {
  height: 120px;
  width: 120px;
  background-size: 100%;
}
.Cnode {
  margin-top: 20px;
}
.node {
  padding: 0px 10px 10px 10px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  border: solid 1px #eee;
}
.node_P {
  color: green;
}
.node_title {
  padding-top: 5px;
}
.node_title:hover {
  color: #5cb85c;
  cursor: pointer;
}
.node_img {
  width: 20px;
  height: 20px;
  margin-top: 5px;
}
.node_all {
  padding: 10px;
  letter-spacing: 1px;
  border-radius: 5px 5px 0px 0px;
  background: #ddd;
  display: flex;
  justify-content: space-between;
}
.change {
  color: cornflowerblue;
  font-weight: 700;
  cursor: pointer;
}
.node_s {
  font-size: 12px;
  font-weight: 800;
}
@media (max-width:990px) {
  .body {
    width: 100%;
  }
  .li_p1 {
    line-height: 60px;
    padding-left: 20px;
  }
  .nav {
    height: 100%;
  }
  .nav_top {
    display: none;
  }
  .nav_right {
    display: none;
  }
 
  /* 移动端 */
  .nav_mo {
    height: 100%;
    background: #1c6132;
    height:100%;
    margin: 0 auto;
    padding:20px;
    display: block !important;
    
  }
  .mo_logo{
    display:flex;
   justify-content: space-between;
  }
  
  .mo_logo .mo_img {
    width: 50px;
    height: 50px;
  }
  .mo_a {
    width: 100%;
    display: block;
    color: #fff;
    text-align:left;
    font-size: 18px;
    font-weight: 700;
    /* border-bottom:1px solid #fff; */
  }
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
  .mo_a1{
    width:28px;
    height: 28px;
  }
  .no_ul{
   display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;
  }
}
.foot-img {
  width: 60px;
}
.vue {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}
.cnode1 {
  width: 150px;
}
.cnode_box {
  display: flex;
  justify-content: space-between;
}
.tell {
  color: #fff;
  font-weight: 700;
  font-size: 12px;
}
@media (max-width:990px) {
  .foot-img{
    width: 30px;
  }
  .vue{
    font-size: 13px;
  }
  .cnode1{
    width:100px;
  }
  .tell{
    font-size: 12px;
    text-shadow: 2px 2px 2px #000;
    margin-top:33px;
  }
  }
  .youqing{
    margin-top:20px;
  }
</style>
