<template>
  <div class="comment-content">
    <div>{{content}}</div>
    
    <div class="comment-content-footer">
       <div style="float:right">
        <el-button
          v-if="canDelete"
          type="text"
          icon="el-icon-delete"
          size="mini"
        >删除</el-button>

        <el-button
          type="text"
          icon="el-icon-time"
          disabled
          size="mini"
        >{{dataFormat(date)}}</el-button>
      </div>
    </div>
  </div>
</template>


<script>
function fillZero(num){
  return num  > 9 ? num  : `0${num}`
}
export default {
  props: ["postId", "commentId", "content", "date", "hasReply", "canDelete"],
  methods: {
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
        fillZero( d.getMinutes()) +
        ":" +
        fillZero(d.getSeconds())
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