<template>
    <div class="c-comment-avatar">
        <!-- TODO:头像框 -->
        <el-link class="u-avatar" :href="userHref"
            ><el-avatar
                class="u-avatar-pic"
                shape="square"
                :size="avatarSize"
                :src="userAvatar"
            ></el-avatar
        ></el-link>
        <el-link
            class="u-name"
            type="primary"
            target="_blank"
            :href="userHref"
            >{{ username }}</el-link
        >
    </div>
</template>

<script>
export default {
    props: ["avatarSize", "userAvatar", "userHref", "username"],
};
</script>

<style lang="less">
.c-comment-avatar {
    width:68px;
    a:hover {
        &:after {
            display: none;
        }
    }
    .u-avatar {
        display: block;
    }
    .u-avatar-pic {
        display: block;
        margin: 5px auto;
    }
    .u-name {
        display: block;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        width:100%;
        padding:5px 0;
        font-size:14px;
    }
}
</style>
