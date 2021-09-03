<template>
    <div class="u-cmt">
        <div class="u-text" v-if="content != ''" v-html="formatContent(content)"></div>
        <div class="u-attachements" v-if="attachments.length">
            <!-- <el-image
                v-for="url in attachments"
                :key="url"
                :src="url | showAttachment"
                :preview-src-list="_attachments"
                lazy
            ></el-image> -->
            <img v-for="(url, index) in attachments" :key="url" :src="url | showAttachment" @click="previewImg(index)">
        </div>
        <div class="u-toolbar">
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
                <Emotion class="c-comment-emotion" @selected="handleEmotionSelected"></Emotion>
                <el-input
                    type="textarea"
                    v-model="newComment.content"
                    placeholder="参与评论..."
                    :id="'id' + inputId"
                ></el-input>
                <el-button
                    class="u-admin"
                    type="text"
                    icon="el-icon-picture"
                    size="mini"
                    @click="showUploader = !showUploader"
                    >图片</el-button
                >
            </el-form-item>
            <el-form-item>
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
import { formatContent } from '../utils'
import Emotion from "@jx3box/jx3box-emotion/src/Emotion.vue"

function fillZero(num) {
    return num > 9 ? num : `0${num}`;
}
export default {
    props: ["content", "date", "hasReply", "canDelete", "attachments", "commentId"],
    components: {
        Uploader,
        Emotion
    },
    data: function() {
        return {
            newComment: {
                content: ''
            },
            showForm: false,
            disableSubmitBtn: false,
            showUploader: false,
            inputId: ''
        };
    },
    mounted() {
        if (this.commentId) this.inputId = this.commentId
    },
    computed : {
        _attachments : function (){
            return this.attachments.map((val) => {
                return resolveImagePath(val)
            })            
        }
    },
    methods: {
        deleteComment() {
            this.$emit("deteleComment");
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

        attachmentUploadFinish(data) {
            this.disableSubmitBtn = false;
            this.$emit("addNewReply", {
                content: this.newComment.content,
                attachmentList: data,
            });
            this.showUploader = false;
            this.newComment = {
                content: ''
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
        async handleEmotionSelected(value) {
            const myField = document.querySelector(`#id${this.inputId}`);
            console.log(myField, value)
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
        previewImg (i) {
            this.$hevueImgPreview({
                multiple: true,
                nowImgIndex: i,
                imgList: this._attachments,
                controlBar: false,
                clickMaskCLose: true
            })
        }
    },
    filters : {
        showAttachment : function (val){
            return resolveImagePath(val) + '?x-oss-process=style/comment_thumb'
        },
    }
};
</script>

<style lang="less">
.c-comment-cmt {
    flex-grow: 1;
    position: relative;
    .u-toolbar {
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
}

</style>
