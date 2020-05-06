<template>
  <div style="width: 100%;">
    <div>{{content}}</div>
    <div style="width: 100%;margin-top: 30px;">
      <el-button size="mini" round icon="el-icon-chat-round" @click="showForm = true">回复</el-button>
      <div style="float:right">
        <el-button
          v-if="canDelete"
          type="text"
          icon="el-icon-delete"
          size="mini"
          @click="deleteComment()"
        >删除</el-button>

        <el-button type="text" icon="el-icon-time" disabled size="mini">{{dataFormat(date)}}</el-button>
      </div>
    </div>
    <el-form v-if="showForm" ref="form" :model="newComment" style="margin-top:10px">
      <el-form-item>
        <el-input type="textarea" v-model="newComment.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="submit()">提交</el-button>
        <el-button size="mini" type="text" @click="showForm = false">收起</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { POST } from "../service";
function fillZero(num) {
  return num > 9 ? num : `0${num}`;
}
export default {
  props: ["postId", "commentId", "content", "date", "hasReply", "canDelete"],
  methods: {
    deleteComment() {
      this.$emit("deteleComment", this.commentId);
    },
    dataFormat(str) {
      let d = new Date(str);
      return (
        d.getFullYear() +
        "-" +
        fillZero(d.getMonth() + 1) +
        "-" +
        fillZero(d.getDate()) +
        " " +
        fillZero(d.getHours()) +
        ":" +
        fillZero(d.getMinutes()) +
        ":" +
        fillZero(d.getSeconds())
      );
    },
    submit() {
      POST(`/api/post/${this.postId}/comment/${this.commentId}/reply`, null, {
        content: this.newComment.content
      })
        .then(() => {
          this.$notify({
            title: "",
            message: "评论成功!",
            type: "success",
            duration: 3000,
            position: "bottom-right"
          });
          this.newComment = {};
          this.$emit("addNewComment");
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