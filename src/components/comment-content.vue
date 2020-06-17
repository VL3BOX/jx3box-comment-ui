<template>
    <div class="u-cmt">
        <div class="u-text">{{ content }}</div>
        <div class="u-action">
            <el-button
                class="u-action-reply"
                size="mini"
                round
                icon="el-icon-chat-round"
                @click="showForm = true"
                >回复</el-button
            >
        </div>

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
            <time class="u-date"
                ><i class="el-icon-time"></i>{{ dataFormat(date) }}</time
            >
        </div>
        <el-form
            v-if="showForm"
            ref="form"
            :model="newComment"
            class="c-comment-subbox"
        >
            <el-form-item>
                <el-input
                    type="textarea"
                    v-model="newComment.content"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" type="primary" @click="submit()"
                    >提交</el-button
                >
                <el-button size="mini" type="text" @click="showForm = false"
                    >收起</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { POST } from "../service";
function fillZero(num) {
    return num > 9 ? num : `0${num}`;
}
export default {
    props: ["postId", "commentId", "content", "date", "hasReply", "canDelete"],
    methods: {
        deleteComment() {
            this.$emit("deteleComment", this.commentId);
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
        submit() {
            POST(
                `/api/post/${this.postId}/comment/${this.commentId}/reply`,
                null,
                {
                    content: this.newComment.content,
                }
            )
                .then(() => {
                    this.$notify({
                        title: "",
                        message: "评论成功!",
                        type: "success",
                        duration: 3000,
                        position: "bottom-right",
                    });
                    this.newComment = {};
                    this.$emit("addNewComment");
                })
                .catch(() => {});
        },
        hideForm() {},
    },
    data: function() {
        return {
            newComment: {},
            showForm: false,
        };
    },
};
</script>

<style lang="less">
.c-comment-cmt {
    flex-grow: 1;
    position: relative;
    .u-toolbar {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 12px;
    }
    .u-date {
        color: #c0c4cc;
        i {
            margin-right: 5px;
        }
    }
    .u-admin {
        margin-right: 10px;
    }
    .u-cmt {
        padding: 5px 0 10px 0;
        .u-text {
            line-height: 1.715;
            white-space: pre-wrap;
        }
        .u-action{
            margin-top:10px;
        }
    }
}
@media screen and (max-width:767px){
    .c-comment-cmt{
        .u-toolbar{
            position: static;
            margin-top:10px;
        }
    }
}

.c-comment-subbox {
    margin-top: 10px;
}
</style>
