<template>
  <el-form ref="form" class="c-comment-subbox">
    回复
    <el-link class="u-name" type="primary" target="_blank" :href="userHref">＠{{ username }}</el-link>：
    <el-form-item>
      <el-input type="textarea" v-model="content"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button size="mini" type="primary" @click="submintReply()">提交</el-button>
      <el-button size="mini" type="text" @click="hideForm()">收起</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ["username", "userHref"],
  data: function() {
    return {
      content: ""
    };
  },
  methods: {
    submintReply() {
      this.$emit("doReply", this.content);
      this.content = "";
    },
    hideForm() {
      this.$emit("hideForm");
    }
  }
};
</script>