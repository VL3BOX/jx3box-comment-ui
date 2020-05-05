<template>
  <div class="comment-content">
    <div>{{content}}</div>
    <div class="comment-content-footer">
      <el-button size="mini" round icon="el-icon-chat-round" @click="showForm = true">回复</el-button>
      <el-button
        type="text"
        icon="el-icon-time"
        disabled
        style="font-size:10px;float:right"
      >{{dataFormat(date)}}</el-button>
    </div>
    <div v-if="showForm">
      <el-form ref="form" :model="newComment">
        <el-form-item>
          <el-input type="textarea" v-model="newComment.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="submit()">提交</el-button>
          <el-button size="mini" type="text" @click="showForm = false">收起</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
import { POST } from "../service";
export default {
  props: ["postId", "commentId", "content", "date", "hasReply"],
  methods: {
    dataFormat(str) {
      let d = new Date(str);
      return (
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds()
      );
    },
    submit() {
      POST(`/api/post/${this.postId}/comment/${this.commentId}/reply`, null, {
        content: this.newComment.content
      })
        .then(data => {
          this.$notify({
            title: "",
            message: "评论成功!",
            type: "success",
            duration: 3000,
            position: "bottom-right"
          });
          this.newComment = {};
          this.$emit("addNewComment", data);
        })
        .catch(() => {});
    },
    hideForm() {}
  },
  data: function() {
    return {
      newComment: {},
      showForm: false
    };
  }
};
</script>

<style scoped>
.comment-content {
  width: 100%;
}
.comment-content-footer {
  width: 100%;
  margin-top: 30px;
}
.comment-content-footer span {
  margin-left: 20px;
}
</style>