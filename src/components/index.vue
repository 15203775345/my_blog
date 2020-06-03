<template>
  <div class="index">
     <div>
         <img class="index-im"
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573391605699&di=66c4cf4306f0194e850c4043e69fca65&imgtype=0&src=http%3A%2F%2Fp1.qhmsg.com%2Ft012b6271bd18cc1d5d.jpg"
      alt
    />
     </div>
    <div class="index_box">
      <div class="row1">
        <header class="header">
          <ul class="tabs">
            <li
              class="tab"
              @click="check_tab(index)"
              :class="{active_:ind==index}"
              v-for="(tab ,index) in tabs"
              :key="index"
            >{{tab.name}}</li>
          </ul>
        </header>
        <div
          class="modal fade"
          id="loading"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          data-backdrop="static"
        >
          <!-- <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">提示</h4>
              </div>
              <div class="modal-body">
                请稍候。。。
                <span id="result"></span>
              </div>
            </div>
          </div> -->
        </div>
        <div class="list">
          <ul class="list_ul" v-for="(topic,index) in topicitems" :key="index">
            <li @click="gotopic(topic.id)" class="list_li">
              <div class="li_left">
                <div class="li_img">
                  <img :src="topic.author.avatar_url" />
                </div>
                <p class="li_p">
                  <span>{{topic.reply_count}}</span>
                  <span>/{{topic.visit_count}}</span>
                </p>
                <!-- <p class="li_p1" v-show="topic.top">
                  <span class="li_sp">置顶</span>
                </p> -->
                <!-- <p class="li_p1" v-show="topic.good"><span class="li_sp">精华</span></p> -->
                <p class="li_p1" v-show="topic.tab === 'weex'">
                  <span class="li_sp">weex</span>
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
                <p class="li_h4">{{topic.title | change_text(35)}}</p>
              </div>
              <div class="li_right">
                <p class="li_pt">{{topic.last_reply_at | replyTime}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
        <div class="fenye">
          <div  class="ye"><button @click="next(Tab)" type="button" class="btn btn-info">上一页</button></div>
          <div  class="ye"><button @click="pre(Tab)" type="button" class="btn btn-info">下一页</button></div>
        </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      topicitems: [],
      ind: 0,
      Tab: "all",
      pageNum: 1,
      tabs: [
        { name: "全部", path: "/all" },
        { name: "精华", path: "/good" },
        { name: "weex", path: "/weex" },
        { name: "分享", path: "/share" },
        { name: "问答", path: "/ask" },
        { name: "招聘", path: "/obj" }
      ]
    };
  },
  methods: {
    check_tab(index) {
      this.ind = index;
      let type = (this.index =
        index == 0
          ? "all"
          : index == 1
            ? "good"
            : index == 2
              ? "weex"
              : index == 3
                ? "share"
                : index == 4 ? "ask" : index == 5 ? "job" : index);
      this.Tab = type;
      $("#loading").modal("show");
      this.$router.push({
        path: "index",
        query: { tab: type }
      });

      this.sendAjax(
        "get",
        "topics" + "?tab=" + type,
        "null",
        res => {
          $("#loading").modal("hide");
          //  console.log(res.data)
          this.topicitems = res.data.data;
        },
        Error => {
          console.log(Error);
        }
      );
    },
    go_tab() {
      this.sendAjax(
        "get",
        "topics",
        "null",
        res => {
          //  console.log(res.data)
          this.topicitems = res.data.data;
        },
        Error => {
          console.log(Error);
        }
      );
    },
    gotopic(id) {
      console.log(id);
      this.$router.push({
        path: "/topic",
        query: { id: id }
      });
      this.reload();
    },
    // 上一页
    next(type) {
      this.pageNum--;
       $("#loading").modal("show");
      let PageNumber = this.pageNum;
      if (PageNumber <= 0) {
        alert("这已经是第一页");
        this.pageNum = 1;
        this.axios
          .get("https://www.vue-js.com/api/v1/topics", {
            params: {
              page: 1,
              tab: type
            }
          })
          .then(res => {
             $("#loading").modal("hide");
            this.topicitems = res.data.data;
          });
      } else {
        this.axios
          .get("https://www.vue-js.com/api/v1/topics", {
            params: {
              page: PageNumber,
              tab: type
            }
          })
          .then(res => {
             $("#loading").modal("hide");
            this.topicitems = res.data.data;
          });
      }
    },
    pre(type) {
      $("#loading").modal("show");
      if (this.topicitems.length < 20) {
        alert("这是最后一页了");
         $("#loading").modal("hide");
      } else {
        this.pageNum++;
        let PageNumber = this.pageNum;
          
        this.axios
          .get("https://www.vue-js.com/api/v1/topics", {
            params: {
              page: PageNumber,
              tab: type
            }
          })
          .then(res => {
            $("#loading").modal("hide");
            // console.log(res)
            this.topicitems = res.data.data;
          });
      }
    }
  },
  created() {
    this.go_tab();
  }
};
</script>

<style>
.index {
  width: 100%;
  background: #eee;
  padding-top: 20px;
  padding: 20px 0px;
}
.index_box {
  background: #fff;
  margin: 0 auto;
  margin-top: 10px;
}
.tabs {
  width: 100%;
  background: #ddd;
  padding: 10px 0;
}
.tabs .tab {
  padding: 2px 5px;
  color: #369219;
  margin-left: 15px;
  border-radius: 5px;
  cursor: pointer;
}
.active_ {
  background: #369219;
  color: #fff !important;
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
  width: 95%;
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
  width: 70px;
  text-align: center;
   padding-left:0 !important;
}
.li_p1 {
  line-height: 60px;
  padding-left:0 !important;
}
.li_h4 {
  padding-left: 10px;
  line-height: 60px;
  font-size: 15px;
  font-weight: 700px;
  /* padding-left: 20px; */
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden
}
.li_h4:hover {
  color: blueviolet;
}
.li_sp {
  background: #369219;
  color: #fff;
  padding: 2px;
  border-radius: 2px;
}
.li_right {
  line-height: 60px;
  padding-right: 50px;
  width: 5%;
}
.index-im {
  width: 100%;
  height: 88px;
}
.fenye {
  display: flex;
  justify-content: space-between;
  background: #fff;
  margin-top: 5px;
}
.ye {
  color: #fff;
  cursor: pointer;
}
.li_pt{
  width: 36px;
}
/* 移动端 */
@media (max-width: 990px) {
  .index{
    padding-top:5px; 
  }
  .li_p{
    padding-left: 0;
    width:55px;
    font-size: 12px;
    padding-right:0 !important;
  }
  .li_p1{
    padding-left: 0;
    width:33px;
    font-size: 12px;
  }
  .li_h4{
    padding: 0;
  }
  .li_h4{
    font-size: 12px;
    font-weight:600; 
    text-overflow:ellipsis;
    padding-right: 5px;
    width:180px;
  }
  .li_img {
    margin-top: 13px;
    padding: 0;
  }
  .list_ul{
    padding-left: 2px;
    padding-right: 2px;
  }
  .li_right{
    padding-right: 0;
    font-size: 12px;
    width: 15%;
  }
  .li_left{
    width: 85%;
  }
  .li_pt{
  width:50px;
}
  }
</style>
