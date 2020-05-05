<template>
  <div class="comment-content">
    <div>{{content}}</div>
    <div class="comment-content-footer">
      <el-button size="mini" round icon="el-icon-chat-round">回复</el-button>
      <el-button
        type="text"
        icon="el-icon-time"
        disabled
        style="font-size:10px;float:right"
      >{{dataFormat(date)}}</el-button>
    </div>
  </div>
</template>


<script>
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
    }
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