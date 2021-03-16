<template>
    <div class="c-comment-avatar">
        <a class="u-avatar" :href="userHref" target="_blank">
            <el-avatar
                class="u-avatar-pic"
                shape="square"
                :size="avatarSize"
                :src="userAvatar"
                :class="{ isCircle }"
            ></el-avatar>
            <i class="u-avatar-frame" v-if="frameName"
                ><img :src="frameUrl"
            /></i>
        </a>
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
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    props: [
        "avatarSize",
        "userAvatar",
        "userHref",
        "username",
        "avatarFrame",
        "withFrame",
    ],
    data: function() {
        return {};
    },
    computed: {
        frames: function() {
            return this.$store.state.frames;
        },
        frameName : function (){
            return (this.avatarFrame && this.frames[this.avatarFrame]) ? this.avatarFrame : ''
        },
        frameUrl : function (){
            if(this.frameName){
                let fileName = this.frames[this.frameName].files.s.file
                return __imgPath + `image/avatar/${this.frameName}/${fileName}`
            }
            return ''
        },
        isCircle: function() {
            return this.frameName && this.frames[this.frameName].style == "circle";
        },
    },
    methods: {},
    mounted: function() {},
};
</script>

<style lang="less">
.c-comment-avatar {
    vertical-align: top;
    margin-right: 20px;
    width: 48px;
    a:hover {
        &:after {
            display: none;
        }
    }
    .u-avatar {
        display: block;
        position: relative;
        margin-left: 6px;
    }
    .u-avatar-pic {
        display: block;
        background-color: #fff;
        width: 48px;
        height: 48px;

        &.isCircle {
            border-radius: 100%;
        }
    }
    .u-avatar-frame {
        position: absolute;
        left: -6px;
        top: -6px;
        width: 60px;
        height: 60px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .u-name {
        display: none;
        text-align: center;
        overflow: hidden;
        width: 100%;
        padding: 5px 0;
        font-size: 12px;
        word-break: break-all;
        line-height: 1.4;
    }
}
// @media screen and (max-width: 767px) {
//     .c-comment-avatar {
//         margin-right: 10px;
//     }
// }
</style>
