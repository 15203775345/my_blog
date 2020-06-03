<template>
  <div class="no_read">
    <ol class="breadcrumb">
      <li>
        <a class="a" href>首页</a>
      </li>
      <li class="active">新消息({{news.length}}条)</li>
    </ol>
    <div class="noreading">
      <ul v-show="news.length===0">
        <li class="read">
          <span>暂无新消息</span>
        </li>
      </ul>
      <ul v-for="(ne,index1) in news" :key="index1">
        <li class="read">
          <span style="color:red">{{ne.author.loginname}}</span>
          回复了您的话题
          <span
            class="st"
            @click="go_n(ne.topic.id)"
            style="color:blue"
          >{{ne.topic.title}}</span>
        </li>
      </ul>
    </div>
    <div class="oldnew">
      <div class="old">过往信息({{olds.length}}条)</div>
      <div class="noreading">
        <ul v-show="olds.length===0">
          <li class="read">
            <span>暂无过往信息</span>
          </li>
        </ul>
        <ul v-for="(old,index) in olds" :key="index">
          <li class="read">
            <span style="color:red">{{old.author.loginname}}</span>
            回复了您的话题
            <span
              class="st"
              @click="go_o(old.topic.id)"
              style="color:blueviolet"
            >{{old.topic.title}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "no_read",
  data() {
    return {
      news: "",
      olds: ""
    };
  },
  methods: {
    go_n(ne) {
      console.log(ne);
      this.$router.push({
        path: "/topic",
        query: { id: ne }
      });
    },
    go_o(old) {
      console.log(old);
      this.$router.push({
        path: "/topic",
        query: { id: old }
      });
    }
  },
  created() {
    this.axios
      .get("https://www.vue-js.com/api/v1/messages", {
        params: {
          accesstoken: this.$store.state.userInfo.token
        }
      })
      .then(res => {
        console.log(res);
        console.log(res.data.data.has_read_messages.length);
        this.olds = res.data.data.has_read_messages;
        this.news = res.data.data.hasnot_read_messages;
      });
  }
};
</script>

<style>
.no_read {
  margin-top: 20px;
}
.breadcrumb {
  padding: 15px !important;
  list-style: none !important;
  background-color: #ddd !important;
  border-radius: 10px 10px 0px 0px !important;
}
.read {
  width: 100%;
  padding: 15px;
  background: #fff;
}
.oldnew {
  margin-top: 20px;
}
.old {
  padding: 15px;
  color: #369219;
  background: #ddd;
  border-radius: 10px 10px 0px 0px;
}
.a {
  color: #369219;
}
.st {
  cursor: pointer;
  font-weight: 700;
}
.st:hover {
  border-bottom: solid 1px blueviolet;
}
@media (max-width: 990px) {
.st{
  font-size:13px;
}
}
</style>
