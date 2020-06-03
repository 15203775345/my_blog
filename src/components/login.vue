<template>
  <div class="login_o">
    <ol class="breadcrumb">
      <li>
        <a href>首页</a>
      </li>
      <li class="active">登录</li>
    </ol>
    <div class="login_box">
      <input type="text" v-model="token" class="form-control" placeholder="请输入你的Access Token值" />
      <div class="but">
        <button @click="subimt" type="button" class="btn btn-primary">点击登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  inject: ["reload"],
  data() {
    return {
      token: ""
    };
  },
  methods: {
    subimt() {
      if (this.token === "" || this.token.length !== 36) {
        alert("请输入36位token值");
      } else {
        this.sendAjax(
          "post",
          "accesstoken",
          {
            accesstoken: this.token
          },
          res => {
            let user = {
              loginname: res.data.loginname,
              avatar_url: res.data.avatar_url,
              userId: res.data.id,
              token: this.token
            };
            localStorage.user = JSON.stringify(user);
            this.$store.dispatch("setUserInfo", user);
            localStorage.loginname = this.$store.state.userInfo.loginname;
            if (res.status === 200) {
              alert("登录成功");
              this.reload();
              this.$router.push({ path: "index" });
            }
          },
          Error => {
            console.log(Error);
          }
        );
      }
    }
  },
  created() {}
};
</script>

<style>
.breadcrumb {
}
.login_o {
  background: #fff;
  margin-top: 20px;
  padding: 20px 50px;
}
.login_box {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
}
.but {
  padding: 20px;
}
</style>
