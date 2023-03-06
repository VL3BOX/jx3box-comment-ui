<template>
    <el-form ref="form" class="c-comment-subbox">
        <div class="u-subbox-label">
            回复
            <el-link type="primary" target="_blank" :href="userHref"
                >＠{{ username }}</el-link
            >
            ：
        </div>
        <el-form-item>
            <el-input
                type="textarea"
                v-model="content"
                :id="'id' + inputId"
                placeholder="输入回复..."
            ></el-input>
        </el-form-item>
        <el-form-item>
            <div class="c-comment-tools">
                <i
                    class="el-icon-picture-outline u-upload-icon"
                    @click="showUploader = !showUploader"
                ></i>
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
                @click="submintReply()"
                :disabled="disableSubmitBtn"
                >提交</el-button
            >
            <el-button size="mini" type="text" @click="hideForm()"
                >收起</el-button
            >
        </el-form-item>
    </el-form>
</template>

<script>
import Uploader from "./upload.vue";
import Emotion from "@jx3box/jx3box-emotion/src/Emotion.vue";
export default {
    props: ["username", "userHref", "currentId"],
    data: function () {
        return {
            content: "",
            showUploader: false,
            disableSubmitBtn: false,
            inputId: "",
        };
    },
    components: {
        Uploader,
        Emotion,
    },
    mounted() {
        if (this.currentId) this.inputId = this.currentId;
    },
    methods: {
        submintReply() {
            this.disableSubmitBtn = true;
            if (this.$refs.uploader) {
                this.$refs.uploader.upload();
            } else {
                this.attachmentUploadFinish([]);
            }
        },
        hideForm() {
            this.$emit("hideForm");
        },
        attachmentUploadFinish(data) {
            this.disableSubmitBtn = false;
            this.$emit("doReply", {
                content: this.content,
                attachmentList: data,
            });
            this.content = "";
            this.showUploader = false;
        },
        attachmentUplodError() {
            this.disableSubmitBtn = false;
        },
        async handleEmotionSelected(emotion) {
            const myField = document.querySelector(`#id${this.inputId}`);
            const value = emotion.key;
            if (myField.selectionStart || myField.selectionStart === 0) {
                let startPos = myField.selectionStart;
                let endPos = myField.selectionEnd;

                this.content =
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
                this.content = value;
            }
        },
    },
};
</script>

<style lang="less">
.c-comment {
    .u-subbox-label {
        margin-bottom: 10px;
    }
}
</style>
