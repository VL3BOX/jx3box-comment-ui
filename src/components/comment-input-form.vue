<template>
  <el-form ref="form" :model="newComment" class="c-comment-box">
    <el-form-item>
      <el-input
        rows="3"
        type="textarea"
        maxlength="300"
        show-word-limit
        v-model="newComment.content"
        placeholder="参与讨论..."
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

export default {
  components: {
    Uploader,
  },
  data: function () {
    return {
      showUploader: false,
      disableSubmitBtn: false,
      newComment: {},
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
      this.newComment = {};
      this.showUploader = false;

      this.disableSubmitBtn = false;
    },
    attachmentUplodError() {
      this.disableSubmitBtn = false;
    },
  },
};
</script>