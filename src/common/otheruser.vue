<template>
  <div class="userinfor">
    <ol class="breadcrumb">
      <li>
        <a class="a" href>首页</a>
      </li>
      <li class="active">用户详情</li>
    </ol>
    <div class="user_top">
      <img class="u_img" :src="box.avatar_url" alt />
      <p class="u_p">{{box.loginname}}</p>
      <p class="u_p">积分:{{box.score}}</p>
    </div>
    <div class="oldnew">
      <div class="old">收藏的话题({{topicitems.length}}条话题)</div>
      <div class="noreading">
        <ul v-show=" topicitems.length===0" style="padding:30px; background:#fff">暂无收藏话题</ul>
        <ul v-for="(topic,index) in topicitems" :key="index">
          <li class="oo">
            <div class="li1_left">
              <div class="li1_img">
                <img class="li1_img" :src="topic.author.avatar_url" />
              </div>
              <p @click="go_detail(topic.id)" class="li1_h4">{{topic.title | change_text(45)}}</p>
            </div>
            <div class="li1_right">
              <p>{{topic.last_reply_at | replyTime}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="oldnew">
      <div class="old">最近参与的的话题({{topicitem.length}}条话题)</div>
      <div class="noreading">
        <ul v-show=" topicitem.length===0" style="padding:30px; background:#fff">暂无参与话题</ul>
        <ul v-for="(to,index) in topicitem" :key="index">
          <li class="oo">
            <div class="li1_left">
              <div class="li1_img">
                <img class="li1_img" :src="to.author.avatar_url" />
              </div>
              <p @click="go_detail(to.id)" class="li1_h4">{{to.title | change_text(45)}}</p>
            </div>
            <div class="li1_right">
              <p>{{to.last_reply_at | replyTime}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="oldnew">
      <div class="old">最近创建的的话题({{recent.length}}条话题)</div>
      <div class="noreading">
        <ul v-show=" recent.length===0" style="padding:30px; background:#fff">暂无创建话题</ul>
        <ul v-for="(c,index) in recent" :key="index">
          <li class="oo">
            <div class="li1_left">
              <div class="li1_img">
                <img class="li1_img" :src="c.author.avatar_url" />
              </div>
              <p @click="go_detail(c.id)" class="li1_h4">{{c.title | change_text(45)}}</p>
            </div>
            <div class="li1_right">
              <p>{{c.last_reply_at | replyTime}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "user",
  data() {
    return {
      box: "",
      topicitems: "",
      topicitem: "",
      recent: ""
    };
  },
  methods: {
    go_detail(id) {
      this.$router.push({
        path: "/topic",
        query: { id: id }
      });
    }
  },
  created() {
    // if (this.$store.state.userInfo.userId) {
      this.axios
        .get(
          "https://www.vue-js.com/api/v1/user/" +
          this.$route.query.name
            // this.$store.state.userInfo.loginname
        )
        .then(res => {
          this.user = res.data.data;
          console.log(res);
          this.box = res.data.data;
          this.topicitems = res.data.data.collect_topics;
          this.topicitem = res.data.data.recent_replies;
          this.recent = res.data.data.recent_topics;
        });
    }
  // }
};
</script>

<style>
.userinfor {
  margin-top: 20px;
}
.user_top {
  display: flex;
  margin-top: 10px;
  background: #fff;
}
.u_img {
  width: 50px;
  height: 50px;
}
.u_p {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
}
.oldnew {
  margin-top: 20px;
  margin-bottom: 20px;
}
.old {
  padding: 15px;
  color: #369219;
  background: #ddd;
  border-radius: 10px 10px 0px 0px;
}
.li1_left {
  display: flex;
  padding: 5px;
}
.oo {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #fff;
}
.li1_img {
  width: 34px;
  height: 34px;
}
.li1_h4 {
  padding-left: 20px;
  color: black;
  font-size: 800;
  cursor: pointer;
}
.li1_h4:hover {
  color: #369219;
}
.li1_right {
  padding: 10px;
}
</style>