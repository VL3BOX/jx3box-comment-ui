<template>
  <div>
    <el-divider v-if="replyList.length"></el-divider>
    <el-row
      v-for="(reply, __index) in replyList"
      :key="reply.id"
      style="padding: 10px 10px 0px 10px;"
      :class="{'comment-need-bg': __index % 2 == 1}"
    >
      <el-col :span="1">
        <Avatar
          :avatar-size="34"
          :user-avatar="defautlAvatar"
          :user-href="profileLink + reply.userId"
          :username="reply.author"
        />
      </el-col>
      <el-col :span="23">
        <CommentContent
          :post-id="postId"
          :comment-id="reply.id"
          :date="reply.commentDate"
          :content="reply.content"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-pagination
        v-show="showPager"
        small
        @current-change="handleCurrentChange"
        :current-page.sync="pager.index"
        :page-size="pager.pageSize"
        layout="total, prev, pager, next"
        :total="pager.total"
      ></el-pagination>
      <div v-if="replyList && replyList.length >= 3">
        <el-button type="text" v-show="showPager" @click="showLess()">收起</el-button>
        <el-button type="text" v-show="!showPager" @click="showMore()">查看更多</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
import { JX3BOX } from "@jx3box/jx3box-common";
import { GET } from "../service";
import CommentContent from "./comment-content-simple.vue";
import Avatar from "./avatar.vue";
export default {
  props: ["postId", "commentId", "originReplyList"],
  components: {
    Avatar,
    CommentContent
  },
  backReplyList: [],
  data: function() {
    return {
      defautlAvatar: JX3BOX.default_avatar,
      profileLink: JX3BOX.__Links.dashboard.profile + "/",
      replyList: [],

      pager: {
        index: 1,
        pageSize: 10,
        pageTotal: 1,
        total: 0
      },
      showPager: false
    };
  },
  mounted() {
    this.backReplyList = this.originReplyList || [];
    this.replyList = this.backReplyList;
    this.$on("refresh", newItem => {
      if (this.showPager) {
        this.loadCommentList(this.pager.index);
      } else if (this.replyList.length < 3) {
        // this.backReplyList.push(newItem);
        this.replyList.push(newItem);
        console.log(newItem);
      }
    });
  },
  methods: {
    showMore() {
      this.showPager = true;
      this.loadCommentList(1);
    },
    showLess() {
      this.showPager = false;
      this.replyList = this.backReplyList;
    },
    handleCurrentChange(gotoIndex) {
      this.loadCommentList(gotoIndex);
    },
    loadCommentList(index) {
      GET(
        `/api/comments/post/${this.postId}/comment/${this.commentId}/reply/page/${index}?pageSize=6`
      )
        .then(resp => {
          this.replyList = resp.data;
          this.pager = resp.page;
        })
        .catch(() => {});
    }
  }
};
</script>


<style scoped>
.comment-need-bg {
  background-color: #f8f8f8;
}
</style>