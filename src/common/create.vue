<template>
  <div class="create">
    <ol class="breadcrumb">
      <li>
        <a class="a" href>首页</a>
      </li>
      <li class="active">发布话题</li>
    </ol>
    <div class="send_text">
      <form role="form">
        <div class="form-group">
          <span class="check_tab">请选择主题：</span>
          <label class="radio-inline">
            <input v-model="type" type="radio" value="ask" name="tab" />问答
          </label>
          <label class="radio-inline">
            <input v-model="type" type="radio" value="share" name="tab" />分享
          </label>
          <label class="radio-inline">
            <input v-model="type" type="radio" value="job" name="tab" />招聘
          </label>
        </div>
      </form>

      <div class="input-group">
        <span class="input-group-addon" id="basic-addon1">标题</span>
        <input
          v-model="Title"
          type="text"
          class="form-control"
          placeholder="请输入标题"
          aria-describedby="basic-addon1"
        />
      </div>
      <!-- 文本编辑器 -->
      <div class="modal-body">
        <div class="edit_container">
          <quill-editor
            v-model="text"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
        </div>
      </div>
      <button @click="Release" type="button" class="btn btn-success">发布话题</button>
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "create",
  components: { quillEditor },
  data() {
    return {
      editorOption: {},
      text: "",
      Title: "",
      type: ""
    };
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    //    发布主题
    Release() {
      if (!this.$store.state.userInfo.token) {
        alert("请先登录!");
      } else if (this.text == null) {
        alert("请选择主题!");
      } else if (this.Title == "") {
        alert("请输入标题!");
      } else {
        console.log(this.text, this.Title, this.type);
        this.axios
          .post("https://www.vue-js.com/api/v1/topics", {
            title: this.Title,
            tab: this.type,
            content: this.text,
            accesstoken: this.$store.state.userInfo.token
          })
          .then(res => {
            alert("发布成功");
            this.$router.push({ path: "index" });
          });
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  }
};
</script>

<style>
.create {
  margin-top: 20px;
}
.breadcrumb {
  padding: 15px !important;
  list-style: none !important;
  background-color: #ddd !important;
  border-radius: 10px 10px 0px 0px !important;
}
.a {
  color: #369219;
}
.send_text {
  margin-top: 10px;
  background: #fff;
  padding: 20px;
}
.check_tab {
  font-weight: 600;
  color: #555;
}
</style>
