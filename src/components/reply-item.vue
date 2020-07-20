<template>
  <el-row>
    <!--用户头像-->
    <Avatar
      :user-avatar="showAvatar(reply.avatar)"
      :user-href="reply.userId | profileLink"
      :username="reply.displayName"
    />
    <!--评论主体内容-->
    <CommentContentSimple
      :comment-id="reply.id"
      :date="reply.commentDate"
      :content="reply.content"
      :can-delete="power.allow || power.uid == reply.userId"
      :can-reply="power.uid != reply.userId"
      :user-href="reply.replyForUID | profileLink"
      :reply-for-username="reply.replyForUsername"
      :reply-for-user-id="reply.replyForUID"
      @delete="deleteReply"
      @showReplyInput="showReplyForReplyFrom = !showReplyForReplyFrom"
    />
    <!--隐藏起来的回复评论的评论表单-->
    <ReplyForReply
      v-if="showReplyForReplyFrom"
      :username="reply.displayName"
      :user-href="reply.userId | profileLink"
      @hideForm="showReplyForReplyFrom = false"
      @doReply="doReply"
    />
  </el-row>
</template>

<script>
import { Utils } from "@jx3box/jx3box-common";
import CommentContentSimple from "./comment-content-simple.vue";
import ReplyForReply from "./reply-for-reply";
import Avatar from "./avatar.vue";
export default {
  props: ["reply", "power"],
  components: {
    Avatar,
    CommentContentSimple,
    ReplyForReply
  },
  backReplyList: [],
  data: function() {
    return {
      showReplyForReplyFrom: false
    };
  },
  filters: {
    profileLink: function(uid) {
      return Utils.authorLink(uid);
    }
  },
  methods: {
    showAvatar: Utils.showAvatar,
    deleteReply(id) {
      this.$emit("deleteReply", id);
    },
    doReply(content) {
      let data = {
        content: content,
        replyForUID: this.reply.userId,
        replyForCommentId: this.reply.id
      };

      this.$emit("addReply", data);
    }
  }
};
</script>