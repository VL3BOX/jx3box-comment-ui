<template>
  <div>
    <el-upload
      action="https://server.jx3box.com/upload"
      ref="upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :auto-upload="false"
      :file-list="fileList"
      :limit="3"
      multiple
      with-credentials
      :on-exceed="onExceed"
      :on-change="onChange"
      :on-success="onSuccess"
      :on-error="onError"
    >
      <i class="el-icon-plus"></i>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过500k的３张图片</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="60%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      successList: [],
    };
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onExceed() {
      this.$notify({
        title: "",
        message: "文件超过数量!",
        type: "error",
        duration: 3000,
        position: "bottom-right",
      });
    },
    onChange(file, fileList) {
      if (file.status == "ready") {
        if (file.size > 500 * 1024) {
          this.$notify({
            title: "",
            message: "图片大小不能超过500kb!",
            type: "error",
            duration: 3000,
            position: "bottom-right",
          });
          fileList.pop();
        } else {
          this.fileList = fileList;
        }
      }
    },
    upload() {
      if (this.fileList.length > 0) {
        this.$refs.upload.submit();
      } else {
        this.$emit("onFinish", []);
      }
    },
    onSuccess(response) {
      this.successList = this.successList.concat(response.data.list);
      if (this.successList.length == this.fileList.length) {
        this.$emit("onFinish", this.successList || []);
        this.fileList = [];
        this.successList = [];
      }
    },
    onError() {
      this.$notify({
        title: "",
        message: "图片上传失败!",
        type: "error",
        duration: 3000,
        position: "bottom-right",
      });
      this.$emit("onError");
      this.fileList = [];
    },
  },
};
</script>