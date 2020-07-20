<template>
    <div class="u-reply">
        <div class="u-reply-content">{{ content }}</div>
        <div class="u-toolbar">
            <el-button
                class="u-admin"
                v-if="canDelete"
                type="text"
                icon="el-icon-delete"
                size="mini"
                @click="deleteComment()"
                >删除</el-button
            >
            <el-button
                class="u-admin"
                v-if="canReply"
                type="text"
                icon="el-icon-chat-line-round"
                size="mini"
                @click="showReplyForReplyInput(!showInput)"
                >回复</el-button
            >

            <time class="u-date"
                ><i class="el-icon-time"></i>{{ dataFormat(date) }}</time
            >
        </div>
        <el-form v-if="showInput" ref="form" class="c-comment-subbox">
            @你好
            <el-form-item>
                <el-input type="textarea" v-model="replyForReply"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" type="primary" @click="submintReply()">提交</el-button>
                <el-button size="mini" type="text" @click="showInput = false" >收起</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
function fillZero(num) {
    return num > 9 ? num : `0${num}`;
}
export default {
    props: ["postId", "commentId", "content", "date", "hasReply", "canDelete", "canReply", "userId"],
    data: function(){
        return {
            showInput: false,
            replyForReply:""
        }
    },
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
        },
        showReplyForReplyInput(flag){
            this.showInput = flag
        },
        submintReply(){
            console.log(this.replyForReply, this.userId, this.commentId)
        }
    },
};
</script>
