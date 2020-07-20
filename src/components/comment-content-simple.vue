<template>
  <div class="u-reply">
    <div class="u-reply-content">
      <span v-if="replyForUserId != 0">
        回复
        <el-link
          class="u-name"
          type="primary"
          target="_blank"
          :href="userHref"
        >@{{ replyForUsername }}</el-link>:
      </span>
      {{ content }}
    </div>
    <div class="u-toolbar">
      <el-button
        class="u-admin"
        v-if="canDelete"
        type="text"
        icon="el-icon-delete"
        size="mini"
        @click="deleteComment()"
      >删除</el-button>
      <el-button
        class="u-admin"
        v-if="canReply"
        type="text"
        icon="el-icon-chat-line-round"
        size="mini"
        @click="showReplyForReplyInput()"
      >回复</el-button>
      <time class="u-date">
        <i class="el-icon-time"></i>
        {{ dataFormat(date) }}
      </time>
    </div>
  </div>
</template>

<script>
import { Utils } from "@jx3box/jx3box-common";
function fillZero(num) {
  return num > 9 ? num : `0${num}`;
}
export default {
  props: [
    "commentId",
    "content",
    "date",
    "hasReply",
    "canDelete",
    "canReply",
    "userHref",
    "replyForUsername",
    "replyForUserId"
  ],
  data: function() {
    return {
      showInput: false
    };
  },
  filters: {
    profileLink: function(uid) {
      return Utils.authorLink(uid);
    }
  },
  methods: {
    deleteComment() {
      this.$emit("delete", this.commentId);
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
    showReplyForReplyInput() {
      this.$emit("showReplyInput");
    }
  }
};
</script>
