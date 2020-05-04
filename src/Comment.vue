<template>
  <el-container>
    <el-main>
      <el-form ref="form" :model="newComment">
        <el-form-item>
          <el-input type="textarea" v-model="newComment.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发表评论</el-button>
        </el-form-item>
      </el-form>
      <el-card v-for="item in commentList" :key="item.comment.id">
        <div>
          <el-row>
            <el-col :span="2">
              <el-row>
                <el-avatar shape="square" :size="68" :src="defautlAvatar"></el-avatar>
              </el-row>
              <el-row>
                <el-link
                  type="primary"
                  target="jx3box_user"
                  :href="profileLink + item.comment.userId"
                >{{item.comment.author}}</el-link>
              </el-row>
            </el-col>
            <el-col :span="22">{{item.comment.content}}</el-col>
          </el-row>
        </div>
      </el-card>
    </el-main>
    <el-footer>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="pager.index"
        :page-size="pager.pageSize"
        layout="total, prev, pager, next"
        :total="pager.total"
      ></el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
import { JX3BOX } from "@jx3box/jx3box-common";
import { GET, POST } from "./service";
// import { ElContainer, ElMain, ElFooter } from "element-ui";
export default {
  name: "Comment",
  props: ["postId"],
  components: {
    // ElContainer,
    // ElMain,
    // ElFooter
  },
  data: function() {
    return {
      commentList: [],
      defautlAvatar: JX3BOX.default_avatar,
      profileLink: JX3BOX.__Links.dashboard.profile + "/",
      newComment: {},
      pager: {
        index: 1,
        pageSize: 10,
        pageTotal: 1,
        total: 0
      }
    };
  },
  methods: {
    reloadCommentList(index) {
      GET(`/api/comments/post/${this.postId}/comment/page/${index}`)
        .then(resp => {
          this.commentList = resp.data;
          this.pager = resp.page;
        })
        .catch(() => {});
    },
    handleCurrentChange(gotoIndex) {
      this.reloadCommentList(gotoIndex);
    },
    onSubmit() {
      POST(`/api/comments/post/${this.postId}/comment`, null, {
        content: this.newComment.content
      })
        .then(() => {
          this.$notify({
            title: "",
            message: "评论成功!",
            type: "success",
            duration: 3000,
            position: "bottom-right"
          });
          if (
            this.pager.index == this.pager.pageTotal ||
            this.pager.total % this.pager.pageSize == 0
          ) {
            this.reloadCommentList(this.pager.index);
          }
        })
        .catch(() => {});
    }
  },

  mounted() {
    this.reloadCommentList(1);
  }
};
</script>

<style scoped>
</style>