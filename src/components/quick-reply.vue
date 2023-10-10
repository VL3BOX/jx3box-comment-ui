<template>
    <div class="c-jx3box-reply">
        <el-popover
            :visible-arrow="false"
            placement="top"
            ref="quickReply"
            trigger="click"
            popper-class="c-jx3box-reply-pop"
        >
            <div class="c-jx3box-reply-pop__content"></div>
            <img
                slot="reference"
                class="u-reference"
                width="24"
                height="24"
                src="../assets/img/comment.svg"
                alt="comment"
            />
        </el-popover>
    </div>
</template>

<script>
export default {
    name: "QuickReply",
};
</script>

<style lang="less">
@import "../assets/css/quick-reply.less";
</style>
