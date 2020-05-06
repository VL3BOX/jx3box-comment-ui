<template>
  <div style="width: 100%;">
    <div>{{content}}</div>

    <div style="width: 100%;">
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
  </div>
</template>


<script>
function fillZero(num) {
  return num > 9 ? num : `0${num}`;
}
export default {
  props: ["postId", "commentId", "content", "date", "hasReply", "canDelete"],
  methods: {
    deleteComment() {
      this.$emit("deleteReply", this.commentId);
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
    }
  }
};
</script>