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

            <time class="u-date"
                ><i class="el-icon-time"></i>{{ dataFormat(date) }}</time
            >
        </div>
    </div>
</template>

<script>
function fillZero(num) {
    return num > 9 ? num : `0${num}`;
}
export default {
    props: ["postId", "commentId", "content", "date", "hasReply", "canDelete"],
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
    },
};
</script>
