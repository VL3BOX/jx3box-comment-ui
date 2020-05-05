<template>
  <div>
    <CommentContent
      :post-id="postId"
      :comment-id="item.comment.id"
      :date="item.comment.commentDate"
      :content="item.comment.content"
      @addNewComment="refreshReply"
    />
    <ReplyList
      :post-id="postId"
      :origin-reply-list="item.reply"
      :comment-id="item.comment.id"
      ref="replyList"
    />
  </div>
</template>

<script>
import CommentContent from "./comment-content.vue";
import ReplyList from "./reply-list.vue";

export default {
  props: ["item", "postId"],
  components: {
    CommentContent,
    ReplyList
  },
  methods: {
    refreshReply(item) {
      this.$refs.replyList.$emit("refresh", item);
    }
  }
};
</script>