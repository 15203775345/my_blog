<template>
  <div class="Collection">
    <ol class="breadcrumb">
      <li>
        <a class="a" href>首页</a>
      </li>
      <li class="active">
        {{ this.$store.state.userInfo.loginname}}收藏的Cnode.js话题
        <span class="tiao">({{topicitems.length}}条收藏)</span>
      </li>
    </ol>
    <div class="list">
      <ul class="list_ul" v-for="(topic,index) in topicitems" :key="index">
        <li @click="gotopics(topic.id)" class="list_li">
          <div class="li_left">
            <div class="li_img">
              <img :src="topic.author.avatar_url" />
            </div>
            <p class="li_p">
              <span>{{topic.reply_count}}</span>
              /{{topic.visit_count}}
            </p>
            <!-- <p class="li_p1" v-show="topic.top"><span class="li_sp">置顶</span></p> -->
            <p class="li_p1" v-show="topic.good">
              <span class="li_sp">精华</span>
            </p>
            <p class="li_p1" v-show="topic.tab === 'share'">
              <span class="li_sp">分享</span>
            </p>
            <p class="li_p1" v-show="topic.tab === 'ask'">
              <span class="li_sp">问答</span>
            </p>
            <p class="li_p1" v-show="topic.tab === 'job'">
              <span class="li_sp">招聘</span>
            </p>
            <p class="li_h4">{{topic.title}}</p>
          </div>
          <div class="li_right">
            <p>{{topic.last_reply_at | replyTime}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Collection",
  data() {
    return {
      topicitems: []
    };
  },
  methods: {
    gotopics(id) {
      // console.log(id)
      this.$router.push({
        path: "/cnode",
        query: { id: id }
      });
    }
  },
  created() {
    this.axios
      .get(
        "https://cnodejs.org/api/v1/topic_collect/" +
          this.$store.state.userInfo.loginname
      )
      .then(res => {
          // console.log(res)
        this.topicitems = res.data.data;
      });
  }
};
</script>

<style>
.Collection {
  margin-top: 20px;
}
.list_li {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  border: solid 1px #eee;
  background: #fff;
}
.list_li:hover {
  background: #eee;
  cursor: pointer;
}
.li_left {
  display: flex;
  height: 60px;
}
.li_img img {
  width: 34px;
  height: 34px;
  border-radius: 5px;
}
.li_img {
  padding: 13px;
}
.li_p {
  line-height: 60px;
  padding-left: 20px;
  width: 80px;
}
.li_p1 {
  line-height: 60px;
  padding-left: 20px;
}
.li_h4 {
  padding-left: 10px;
  line-height: 60px;
  font-size: 15px;
  font-weight: 700px;
  padding-left: 20px;
}
.li_sp {
  background: #369219;
  color: #fff;
  padding: 2px;
  border-radius: 2px;
}

.li_right {
  line-height: 60px;
  padding-right: 20px;
}
.tiao {
  padding-left: 20px;
  color: #369219;
  font-size: 14px;
  font-weight: 700;
}
@media (max-width: 990px) {
.li_img{
  padding:0;
}
}
</style>
