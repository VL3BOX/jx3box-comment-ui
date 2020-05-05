<template>
  <div class="comment-content">
    <div>{{content}}</div>
    <div class="comment-content-footer">
      <el-button
        type="text"
        disabled
        icon="el-icon-time"
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
}
.comment-content-footer span {
  margin-left: 20px;
}
</style>