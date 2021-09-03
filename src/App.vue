<template>
    <Comment id="19382" category="post" order="desc" />
    <!-- <Comment id="24423" category="post" order="desc" /> -->
</template>

<script>
import Comment from "./Comment.vue";
export default {
    components: {
        Comment,
    },
};
</script>

<style lang="less">
.hevue-imgpreview-wrap {
    .he-img-wrap {
        background: rgba(0,0,0,0.8)!important;
    }
    .arrow, .he-close-icon {
        display: block!important;
        text-align: center!important;
    }
    .he-close-icon {
        &:hover {
            transform: scale(1.2)!important;
        }
    }
}
</style>
