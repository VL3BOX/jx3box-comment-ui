<template>
  <el-form ref="form" class="c-comment-subbox">
    回复
    <el-link class="u-name" type="primary" target="_blank" :href="userHref">＠{{ username }}</el-link> ：
    <el-form-item>
      <el-input type="textarea" v-model="content"></el-input>
      <el-button
        class="u-admin"
        type="text"
        icon="el-icon-picture"
        size="mini"
        @click="showUploader = !showUploader"
      >图片</el-button>
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
      <el-button size="mini" type="primary" @click="submintReply()" :disabled="disableSubmitBtn">提交</el-button>
      <el-button size="mini" type="text" @click="hideForm()">收起</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Uploader from "./upload.vue";
export default {
  props: ["username", "userHref"],
  data: function () {
    return {
      content: "",
      showUploader: false,
      disableSubmitBtn: false,
    };
  },
  components: {
    Uploader,
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
  },
};
</script>