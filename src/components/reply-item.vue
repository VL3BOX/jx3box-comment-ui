<template>
    <el-row>
        <!--用户头像-->
        <Avatar
            :user-avatar="reply.avatar | showAvatar"
            :user-href="reply.userId | profileLink"
            :username="reply.displayName"
            :avatarFrame="reply.avatarFrame"
            :withFrame="false"
        />
        <!--评论主体内容-->
        <CommentContentSimple
            :comment-id="reply.id"
            :date="reply.commentDate"
            :content="reply.content"
            :attachments="reply.attachments | stringToArray"
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
import { getThumbnail, authorLink } from "@jx3box/jx3box-common/js/utils";
import { default_avatar } from "@jx3box/jx3box-common/js/jx3box.json";
import CommentContentSimple from "./comment-content-simple.vue";
import ReplyForReply from "./reply-for-reply";
import Avatar from "./avatar.vue";
export default {
    props: ["reply", "power"],
    components: {
        Avatar,
        CommentContentSimple,
        ReplyForReply,
    },
    backReplyList: [],
    data: function() {
        return {
            showReplyForReplyFrom: false,
        };
    },
    filters: {
        profileLink: function(uid) {
            return authorLink(uid);
        },
        stringToArray: function(str) {
            if (!str) {
                return [];
            }
            return JSON.parse(str);
        },
        showAvatar: function(val) {
            return val
                ? getThumbnail(val, 28, true)
                : getThumbnail(default_avatar, 28);
        },
    },
    methods: {
        deleteReply(id) {
            this.$emit("deleteReply", id);
        },
        doReply(replyData) {
            (replyData.replyForUID = this.reply.userId),
                (replyData.replyForCommentId = this.reply.id),
                this.$emit("addReply", replyData);
            this.showReplyForReplyFrom = false;
        },
    },
};
</script>
