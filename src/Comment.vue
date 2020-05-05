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
      <el-divider></el-divider>
      <div v-for="item in commentList" :key="item.comment.id">
        <el-row>
          <el-col :span="2">
            <Avatar
              :avatar-size="68"
              :user-avatar="defautlAvatar"
              :user-href="profileLink + item.comment.userId"
              :username="item.comment.author"
            />
          </el-col>
          <el-col :span="22">
            <CommentContent
              :post-id="postId"
              :comment-id="item.comment.id"
              :date="item.comment.commentDate"
              :content="item.comment.content"
            />
            <ReplyListSimple v-if="item.reply" :reply-list="item.reply" :post-id="postId" />
            <div v-if="item.reply && item.reply.length >= 3">
              <el-button type="text" @click="showMore()">查看更多</el-button>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
      </div>
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
import Avatar from "./components/avatar.vue";
import CommentContent from "./components/comment-content.vue";
import ReplyListSimple from "./components/reply-list-simple.vue";
import { GET, POST } from "./service";
// import { ElContainer, ElMain, ElFooter } from "element-ui";
export default {
  name: "Comment",
  props: ["postId"],
  components: {
    Avatar,
    CommentContent,
    ReplyListSimple
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

