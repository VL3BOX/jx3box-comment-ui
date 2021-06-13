<template>
  <el-form ref="form" :model="newComment" class="c-comment-box">
    <el-form-item>
      <Emotion @selected="handleEmotionSelected"></Emotion>
      <el-input
        rows="3"
        type="textarea"
        maxlength="300"
        show-word-limit
        v-model="newComment.content"
        placeholder="参与讨论..."
        :id="inputId"
      ></el-input>
      <Uploader
        class="u-uploader"
        ref="uploader"
        @onFinish="attachmentUploadFinish"
        @onError="attachmentUplodError"
        v-if="showUploader"
      />
      <div class="u-toolbar">
        <el-button
          class="u-admin"
          type="text"
          icon="el-icon-picture"
          size="mini"
          @click="showUploader = !showUploader"
        >图片</el-button>
        <el-button
          type="primary"
          @click="onSubmit"
          class="u-publish"
          :disabled="disableSubmitBtn"
        >发表评论</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import Uploader from "./upload.vue";
import Emotion from "@jx3box/jx3box-emotion/src/Emotion.vue"

export default {
  components: {
    Uploader,
    Emotion
  },
  props: {
      // 用于判定该评论组件是否在底部
      isBottom: {
          type: Boolean,
          default: false
      }
  },
  mounted() {
      if (this.isBottom) this.inputId = 'textarea-bottom'
  },
  data: function () {
    return {
      showUploader: false,
      disableSubmitBtn: false,
      newComment: {
          content: ''
      },
      inputId: 'textarea-top'
    };
  },
  methods: {
    onSubmit() {
      this.disableSubmitBtn = true;
      if (this.$refs.uploader) {
        this.$refs.uploader.upload();
      } else {
        this.attachmentUploadFinish([]);
      }
    },
    // 文件上传完成后，进行数据提交
    attachmentUploadFinish(data) {
      this.$emit("submit", {
        content: this.newComment.content,
        attachmentList: data,
      });
      this.newComment = {
          content: ''
      };
      this.showUploader = false;

      this.disableSubmitBtn = false;
    },
    attachmentUplodError() {
      this.disableSubmitBtn = false;
    },
    // 处理表情
    handleEmotionSelected(key) {
        console.log(key)
        this.insertVariable(key)
    },
    /**
     * add emotion to textarea
     * @parma {string} value emotion key
     */
    async insertVariable(value) {
        const myField = document.querySelector(`#${this.inputId}`);
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
  },
};
</script>