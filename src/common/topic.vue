<template>
    <div class="topic">
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
            {{topics.title}}</h4>
           <p class="topic_p"> .发布于 {{topics.last_reply_at | replyTime}} 
              .作者 {{thord.loginname}} . {{topics.visit_count}} 次浏览 
                .来自 {{topics.tab}}</p>
           </div> 
           <div class="buton">
               <div class="succ">  <button type="button" @click="collect(topics.id)" class="btn btn-success">加入收藏</button></div>
                 <div class="dg"><button type="button" @click="nocollect(topics.id)"  class="btn btn-danger">取消收藏</button></div>
           </div>
        </div>
            <div class="content" v-html="topics.content">
              {{topics.content}}
            </div>
       </div>
        <div  class="comment">
            <!-- 评论区 -->
     <div class="num">{{comment.length}}回复</div>
       <div class="comment_list" v-for="(com,id) in comment" :key="id">
             <ul>
               <li class="list_">
                   <div class="li">
                       <img  @click="go_userin(com.author.loginname)"  class="list_img" :src="com.author.avatar_url" alt="">
                   <div class="list_box">
                    <p ><span  @click="go_userin(com.author.loginname)" class="name_sp">{{com.author.loginname}}</span><span class="time_sp">{{id+1}}楼---{{com.create_at | replyTime}}</span></p>
                    <p v-html="com.content">{{com.content}}</p>
                   </div>
                   </div>
                   <div class="li_cotor">
                     <span  :class="{heartActive: isUps(com.ups)}" @click="thumbs_up(com)" class="glyphicon glyphicon-thumbs-up"><span class="num_z">{{com.ups.length}}</span></span>
                     <span @click="replie(id,com.author.loginname,com.id)" data-toggle="modal" data-target="#myModal" class="glyphicon glyphicon-pencil"></span>
                   </div>
               </li>
           </ul>
       </div>
        <!-- 回复评论模态框 -->
                    <!-- Modal -->
                    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">回复评论</h4>
                        </div>
                        <div class="modal-body">
                             <div class="edit_container">
                                 <textarea  style="resize:none;"  class="are" name="" id=""  rows="5" v-model="replyText">

                                 </textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" @click="call(topics.id, v3)" data-dismiss="modal" class="btn btn-primary">回复</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <comment></comment>
                </div>
</template>
<script>
import comment from "../view/comment";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
     inject: ["reload"],
  name: "topic",
  components: { comment, quillEditor },
  data() {
    return {
      topics: [],
      thord: [],
      comment: [],
      com_id: "",
      editorOption: {},
      replyNum: "",
      replyText: "",
      v3: ""
    };
  },
  methods: {
    go_userin(name){
     this.$router.push({
       path:'/otheruser',
       query:{name:name}
     });
    },
    collect(id) {
      // console.log(this.is)
      if (!this.$store.state.userInfo.token) {
        alert("请先登录!");
      } else {
        this.axios
          .post("https://www.vue-js.com/api/v1/topic/collect ", {
            accesstoken: this.$store.state.userInfo.token,
            topic_id: id
          })
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              alert("收藏成功");
            } else {
              alert("收藏失败");
            }
          });
      }
    },
    nocollect(id) {
      // console.log(this.no)
      if (!this.$store.state.userInfo.token) {
        alert("请先登录!");
      } else {
        this.axios
          .post("https://www.vue-js.com/api/v1/topic/de_collect ", {
            accesstoken: this.$store.state.userInfo.token,
            topic_id: id
          })
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              alert("取消成功");
            } else {
              alert("取消失败");
            }
          });
      }
    },

    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    //  点赞
    thumbs_up(com) {
    //   console.log(com);
      if (!this.$store.state.userInfo.token) {
        alert("请先登录!");
      } else {
        this.axios
          .post("https://www.vue-js.com/api/v1/reply/" + com.id + "/ups", {
            accesstoken: this.$store.state.userInfo.token
          })
          .then(res => {
            //  console.log(res.data)
            if (res.data.action === "down") {
              let index = $.inArray(this.$store.state.userInfo.userId, com.ups);
              com.ups.splice(index, 1);
            } else {
              com.ups.push(this.$store.state.userInfo.userId);
            }
          });
      }
    },
    isUps(ups) {
      return $.inArray(this.$store.state.userInfo.userId, ups) >= 0;
    },
    // 回复评论
    replie(id, value, v3) {
    //   console.log(id, value, v3);
      if (!this.$store.state.userInfo.token) {
        alert("请先登录!");
      }
      this.v3 = v3;
      this.replyNum = id;
      console.log(this.replyNum);
      console.log(id, value);
      if ((this.replyNum = id)) {
        this.replyText = "@" + value;
      }
    },
    call(value1, value2) {
    //   console.log(value1, value2);
      if (this.replyText === "") {
        alert("评论不能为空");
      } else {
        this.axios
          .post("https://www.vue-js.com/api/v1/topic/" + value1 + "/replies", {
            content: this.replyText,
            reply_id: value2,
            accesstoken: this.$store.state.userInfo.token
          })
          .then(res => {
            // console.log(res);
            if (res.data.success === true) {
              alert("回复成功!");
              this.replyText = "";
              this.reload()
            } else {
              alert("回复失败!");
            }
          });
      }
    }
  },
  created() {
    //  获取详情页
    this.sendAjax(
      "get",
      "topic/" + this.$route.query.id,
      "null",
      res => {
        console.log(res)
        localStorage.author = JSON.stringify(res.data.data.author);
        this.topics = res.data.data;
        this.thord = res.data.data.author;
        this.comment = res.data.data.replies;
        //  console.log(this.comment)
      },
      Error => {
        console.log(Error);
      }
    );
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  }
};
</script>
<style>
.topic {
  margin-top: 20px;
  /* background: #fff; */
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
  font-size: 16px;
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

.num {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  color: #369219;
  background: #fff;
  border-radius: 5px;
  border-bottom: solid 2px #eee;
}
.comment_list {
}
.list_img {
  width: 35px;
  height: 35px;
  margin: 12px;
  cursor: pointer;
}
.list_ {
  width: 100%;
  background: #fff;
  border-bottom: solid 1px #eee;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
}
.li {
  display: flex;
  justify-content: flex-start;
}
.name_sp {
  color: #000;
  font-size: 12px;
  font-weight: 700;
  padding-right: 10px;
  cursor: pointer;
}
.name_sp:hover{
  color: #f63c33;
}
.time_sp {
  color: blueviolet;
  font-size: 12px;
}
.glyphicon-thumbs-up {
  font-size: 18px;
  padding-right: 20px;
  cursor: pointer;
}
.glyphicon-pencil {
  font-size: 18px;
  cursor: pointer;
}
.li_cotor {
  margin: 20px;
}
.num_z {
  font-size: 14px;
}
.heartActive {
  color: #f63c33;
}
.markdown-text img {
  max-width: 100%;
  background-size: 100%;
}
.are{
    width: 100%;
}
@media (max-width: 990px) {
 .topic_h4 {
    font-size: 14px;
    font-weight: 700;
}
.markdown-text{
  overflow: hidden;
}
.markdown-text h3{
  overflow: hidden;
  font-size: 13px;
}
.list_ {
  padding: 0;
}
.li_cotor {
    margin: 5px;
}
.btn-success{
  padding: 2px;
  margin: 2px;
}
.btn-danger{
  padding: 2px;
  margin: 2px;
}
  }
</style>
