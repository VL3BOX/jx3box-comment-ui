<template>
    <div class="c-comment-cmt">
        <CommentContent
            :post-id="postId"
            :comment-id="item.comment.id"
            :date="item.comment.commentDate"
            :content="item.comment.content"
            :can-delete="power.allow || power.uid == item.user.id"
            @addNewComment="refreshReply"
            @deteleComment="deteleComment"
        />
        <ReplyList
            :post-id="postId"
            :origin-reply-list="item.reply"
            :comment-id="item.comment.id"
            :power="power"
            ref="replyList"
        />
    </div>
</template>

<script>
import CommentContent from "./comment-content.vue";
import ReplyList from "./reply-list.vue";

export default {
    props: ["item", "postId", "power"],
    components: {
        CommentContent,
        ReplyList,
    },
    methods: {
        deteleComment(id) {
            this.$emit("deteleComment", id);
        },
        refreshReply() {
            this.$refs.replyList.$emit("refresh");
        },
    },
};
</script>
