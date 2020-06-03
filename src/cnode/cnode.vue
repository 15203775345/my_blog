<template>
  <div class="cnode">
    <div class="topic_box">
      <div class="title">
        <div class="flex_left">
          <h4 class="topic_h4">
            <span v-show="topics.top" class="topic_sp">置顶</span>
            <span v-show="topics.good" class="topic_sp">精华</span>
            <span v-show="topics.tab=='share'" class="topic_sp">分享</span>
            <span v-show="topics.tab=='ask'" class="topic_sp">问答</span>
            <span v-show="topics.tab =='weex'" class="topic_sp">weex</span>
            <span v-show="topics.tab=='job'" class="topic_sp">招聘</span>
            {{topics.title}}
          </h4>
          <p class="topic_p">
            .发布于 {{topics.last_reply_at | replyTime}}
            .作者 {{thord.loginname}} . {{topics.visit_count}} 次浏览
            .来自 {{topics.tab}}
          </p>
        </div>
        <div class="buton">
          <button 
            v-show=" iscollect"
            @click="collect(topics.id)"
            type="button"
            class="btn btn-success"
          >加入收藏</button>
          <button
            v-show="no_collect"
            @click="nocollect(topics.id)"
            type="button"
            class="btn btn-danger"
          >取消收藏</button>
        </div>
      </div>
      <div class="content" v-html="topics.content">{{topics.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topics: [],
      thord: [],
      iscollect: true,
      no_collect: true
    };
  },
  methods: {
    collect(id) {
      console.log(this.is);
      if (!this.$store.state.userInfo.token) {
        alert("请先登录!");
      } else {
        this.axios
          .post("https://cnodejs.org/api/v1/topic_collect/collect", {
            accesstoken: "f59b3081-11dc-48dd-baa1-1dcfb3d735b6",
            topic_id: id
          })
          .then(res => {
            // console.log(res);
            if (res.status === 200) {
              alert("收藏成功");
            } else {
              alert("收藏失败");
            }
          });
      }
    },
    nocollect(id) {
      console.log(this.no);
      if (!this.$store.state.userInfo.token) {
        alert("请先登录!");
      } else {
        this.axios
          .post("https://cnodejs.org/api/v1/topic_collect/de_collect", {
            accesstoken: "f59b3081-11dc-48dd-baa1-1dcfb3d735b6",
            topic_id: id
          })
          .then(res => {
            // console.log(res);
            if (res.status === 200) {
              alert("取消成功");
            } else {
              alert("取消失败");
            }
          });
      }
    }
  },
  created() {
    this.axios
      .get("https://cnodejs.org/api/v1/topic/" + this.$route.query.id, {
        params: {
          accesstoken: "3d3c9ae0-8c4e-40d7-ab06-b5bbc0eb1db1"
        }
      })
      .then(res => {
        //  console.log(res)
        this.topics = res.data.data;
        this.thord = res.data.data.author;
      });
  }
};
</script>

<style>
.cnode {
  margin-top: 20px;
  margin-bottom: 20px;
}
.title {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.topic_h4 {
  font-size: 20px;
  font-weight: 700;
}
.topic_p {
  font-size: 12px;
}
.flex_left {
  padding: 0px 10px;
}
.topic_sp {
  font-size: 12px;
  color: #fff;
  background: #5cb85c;
  padding: 2px;
  border-radius: 2px;
}
.content {
  padding: 0 20px;
  background: #fff;
  overflow: hidden;
}
.content img {
  height: auto;
  max-width: 100%;
  vertical-align: middle;
}
.comment {
  margin-top: 20px;
}
@media (max-width: 990px) {
.btn-success{
  padding: 2px;
  margin: 2px;
}
.btn-danger{
  padding: 2px;
  margin: 2px;
}
.topic_h4{
  font-size: 16px;
}
.markdown-text h1{
  font-size: 14px;
  font-weight:700; 
}
.markdown-text p{
  font-size: 13px;
}
.markdown-text h4{
  font-size:13px;
}
.markdown-text h2{
  font-size:20px;
}
}
</style>
