<template>
  <div class="commer">
    <div class="biao">增添回复</div>

    <div class="edit_container">
      <quill-editor
        v-model="contents"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
      <div class="ping">
        <button @click="sendask(topics.id)" type="button" class="btn btn-success">评论</button>
      </div>
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  inject: ["reload"],
  components: {
    quillEditor
  },
  data() {
    return {
      contents: ``,
      editorOption: {},
      topics: []
    };
  },
  methods: {
    //    评论
    sendask(id) {
      if (!this.$store.state.userInfo.token) {
        alert("请先登录!");
      }
      if (this.contents === "") {
        alert("评论不能为空!");
      } else {
        this.axios
          .post("https://www.vue-js.com/api/v1/topic/" + id + "/replies", {
            accesstoken: this.$store.state.userInfo.token,
            content: this.contents
          })
          .then(res => {
            // console.log(res)
            if (res.data.success === true) {
              alert("评论成功!");
              this.reload();
              this.contents = "";
              //      this.axios.get('https://www.vue-js.com/api/v1/topic/' + this.$route.query.id, {
              //     params: {
              //       accesstoken: this.$store.state.userInfo.token
              //     }
              //   }).then((response) => {
              //     this.articleDetails = response.data
              //     this.articleContent = response.data.data.content
              //     this.commentInfo = response.data.data.replies
              //   })
            } else {
              alert("评论失败");
            }
          });
      }
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {} // 内容改变事件
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  created() {
    //  获取详情页
    this.sendAjax(
      "get",
      "topic/" + this.$route.query.id,
      "null",
      res => {
        // console.log(res.data.data.id)
        localStorage.author = JSON.stringify(res.data.data.author);
        this.topics = res.data.data;
        this.thord = res.data.data.author;
        this.comment = res.data.data.replies;
      },
      Error => {
        console.log(Error);
      }
    );
  }
};
</script>

<style>
.commer {
  padding-bottom: 20px;
  padding-top: 20px;
}
.biao {
  padding: 10px;
  background: #fff;
  color: #369219;
  border-radius: 5px;
}
.edit_container {
  background: #fff;
}
.ping {
  padding: 10px;
}
</style>
