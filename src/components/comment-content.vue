<template>
    <div class="u-cmt">
        <div
            class="u-text"
            v-if="content != ''"
            v-html="formatContent(content)"
        ></div>
        <div class="u-attachements" v-if="attachments.length">
            <el-image
                v-for="url in attachments"
                :key="url"
                :src="url | showAttachment"
                :preview-src-list="[showPreview(url)]"
                lazy
            ></el-image>
        </div>
        <div class="u-toolbar">
            <el-button
                class="u-admin"
                v-if="!currentUserHadLike"
                type="text"
                size="mini"
                @click="doLike(true)"
                ><img class="u-up" src="~@/assets/img/up.svg" alt="">点赞{{ likesFormat(hasLikeCount) }}</el-button
            >
            <el-button
                class="u-admin"
                type="text"
                size="mini"
                v-if="currentUserHadLike"
                @click="doLike(false)"
                ><img class="u-up" src="~@/assets/img/uped.svg" alt="">已赞{{ likesFormat(hasLikeCount) }}</el-button
            >
            <el-button
                class="u-admin"
                type="text"
                size="mini"
                icon="el-icon-chat-round"
                @click="showForm = !showForm"
                >回复</el-button
            >
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
                v-if="canSetTop"
                type="text"
                icon="el-icon-top"
                size="mini"
                @click="topComment(true)"
                >置顶</el-button
            >
            <el-button
                class="u-admin"
                v-if="canCancelTop"
                type="text"
                icon="el-icon-top"
                size="mini"
                @click="topComment(false)"
                >取消置顶</el-button
            >
            <el-button
                class="u-admin"
                v-if="canSetStar"
                type="text"
                icon="el-icon-star-off"
                size="mini"
                @click="starComment(true)"
                >加精</el-button
            >
            <el-button
                class="u-admin"
                v-if="canCancelStar"
                type="text"
                icon="el-icon-star-on"
                size="mini"
                @click="starComment(false)"
                >取消加精</el-button
            >
            <time class="u-date">
                <i class="el-icon-time"></i>
                {{ dataFormat(date) }}
            </time>
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
                    placeholder="参与评论..."
                    :id="'id' + inputId"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <div class="c-comment-tools">
                    <i class="el-icon-picture-outline u-upload-icon" @click="showUploader = !showUploader"></i>
                    <Emotion
                        class="c-comment-emotion"
                        @selected="handleEmotionSelected"
                        type="pop"
                        :max="6"
                    ></Emotion>
                </div>
                <Uploader
                    v-if="showUploader"
                    ref="uploader"
                    @onFinish="attachmentUploadFinish"
                    @onError="attachmentUplodError"
                />
            </el-form-item>
            <el-form-item>
                <el-button
                    size="mini"
                    type="primary"
                    @click="submit()"
                    :disabled="disableSubmitBtn"
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
import Uploader from "./upload.vue";
import { resolveImagePath } from "@jx3box/jx3box-common/js/utils";
import { formatContent } from "../utils";
import Emotion from "@jx3box/jx3box-emotion/src/Emotion.vue";

function fillZero(num) {
    return num > 9 ? num : `0${num}`;
}
export default {
    props: [
        "content",
        "date",
        "hasReply",
        "canDelete",
        "canSetTop",
        "isLike", // 是否已点赞
        "likes", // 点赞数
        "canCancelTop",
        "canSetStar",
        "canCancelStar",
        "attachments",
        "commentId",
    ],
    components: {
        Uploader,
        Emotion,
    },
    data: function () {
        return {
            newComment: {
                content: "",
            },
            showForm: false,
            disableSubmitBtn: false,
            showUploader: false,
            inputId: "",
            previewList: [],
            
            currentUserHadLike: this.isLike,
            hasLikeCount: this.likes,
        };
    },
    mounted() {
        if (this.commentId) this.inputId = this.commentId;
    },
    computed: {
        _attachments: function () {
            return this.attachments.map((val) => {
                return resolveImagePath(val);
            });
        },
    },
    methods: {
        doLike(setLike){
            if(setLike === this.currentUserHadLike){
                return
            }
            this.currentUserHadLike = setLike;
            this.hasLikeCount = setLike ? this.hasLikeCount + 1 : this.hasLikeCount - 1;
            this.$emit("setLikeComment", setLike);
        },
        topComment(setTop) {
            this.$emit("setTopComment", setTop);
        },
        starComment(setStar) {
            this.$emit("setStarComment", setStar);
        },
        deleteComment() {
            this.$confirm("确定删除该评论吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.$emit("deleteComment");
                })
                .catch(() => {});
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
        likesFormat(count){
            return count > 0 ? count : ''
        },

        attachmentUploadFinish(data) {
            this.disableSubmitBtn = false;
            this.$emit("addNewReply", {
                content: this.newComment.content,
                attachmentList: data,
            });
            this.showUploader = false;
            this.newComment = {
                content: "",
            };
        },
        attachmentUplodError() {
            this.disableSubmitBtn = false;
        },

        submit() {
            this.disableSubmitBtn = true;
            if (this.$refs.uploader) {
                this.$refs.uploader.upload();
            } else {
                this.attachmentUploadFinish([]);
            }
        },
        hideForm() {},
        formatContent,
        async handleEmotionSelected(emotionVal) {
            const myField = document.querySelector(`#id${this.inputId}`);
            const value = emotionVal.key;
            if (myField.selectionStart || myField.selectionStart === 0) {
                let startPos = myField.selectionStart;
                let endPos = myField.selectionEnd;

                this.newComment.content =
                    myField.value.substring(0, startPos) +
                    value +
                    myField.value.substring(endPos, myField.value.length);

                await this.$nextTick();

                myField.focus();
                myField.setSelectionRange(
                    endPos + value.length,
                    endPos + value.length
                );
            } else {
                this.newComment.content = value;
            }
        },
        showPreview: function (val) {
            return resolveImagePath(val);
        },
    },
    filters: {
        showAttachment: function (val) {
            return resolveImagePath(val) + "?x-oss-process=style/comment_thumb";
        },
    },
};
</script>

<style lang="less">
.c-comment-cmt {
    flex-grow: 1;
    position: relative;
    .u-toolbar {
        font-size: 12px;
        .el-button + .el-button {
            margin-left: 20px;
        }
    }
    .u-date {
        color: #c0c4cc;
        margin-left: 20px;
        i {
            margin-right: 5px;
        }
    }
    .u-cmt {
        padding: 5px 0 10px 0;
        .u-text {
            line-height: 1.715;
            img {
                vertical-align: -3px;
            }
            white-space: pre-line;
        }
        .u-action {
            margin-top: 10px;
        }
        .u-attachements {
            margin-top: 10px;
            .el-image {
                margin-right: 20px;
            }
        }
    }
    .u-up {
        width: 12px;
        height: 12px;
        position: relative;
        top: 1px;
        margin-right: 5px;
    }
}
@media screen and (max-width: 767px) {
    .c-comment-cmt {
        .u-toolbar {
            position: static;
            margin-top: 10px;
        }
    }
}

.c-comment-subbox {
    margin-top: 10px;
    .el-form-item {
        margin-bottom: 0px;
    }
    textarea {
        font-family: inherit;
    }
}
</style>
