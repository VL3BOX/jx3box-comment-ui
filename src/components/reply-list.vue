<template>
  <div>
    <el-divider v-if="replyList.length"></el-divider>
    <el-row
      v-for="(reply, __index) in replyList"
      :key="reply.comment.id"
      style="padding: 10px"
      :class="{'comment-need-bg': __index % 2 == 1}"
    >
      <el-col :span="1">
        <Avatar
          :avatar-size="34"
          :user-avatar="showAvatar(reply.user.avatar)"
          :user-href="profileLink + reply.user.id"
          :username="reply.user.displayName"
        />
      </el-col>
      <el-col :span="23">
        <CommentContentSimple
          :post-id="postId"
          :comment-id="reply.comment.id"
          :date="reply.comment.commentDate"
          :content="reply.comment.content"
          :can-delete="power.allow || power.uid == reply.user.id"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="1" v-if="replyList.length >= 3 || showPager">
        <el-button type="text" v-show="showPager" @click="showLess()">收起</el-button>
        <el-button type="text" v-show="!showPager" @click="showMore()">查看更多</el-button>
      </el-col>
      <el-col :span="23" style="padding: 7px">
        <el-pagination
          v-show="showPager"
          small
          @current-change="handleCurrentChange"
          :current-page.sync="pager.index"
          :page-size="pager.pageSize"
          layout="total, prev, pager, next"
          :total="pager.total"
        ></el-pagination>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { JX3BOX, Utils } from "@jx3box/jx3box-common";
import { GET } from "../service";
import CommentContentSimple from "./comment-content-simple.vue";
import Avatar from "./avatar.vue";
export default {
  props: ["postId", "commentId", "originReplyList", "power"],
  components: {
    Avatar,
    CommentContentSimple
  },
  backReplyList: [],
  data: function() {
    return {
      profileLink: JX3BOX.__Links.author + "/",
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
    this.$on("refresh", ()=> {
      if (this.showPager) {
        this.loadCommentList(this.pager.index);
      } else if (this.replyList.length < 3) {
        this.loadCommentList(1, 3)
      }
    });
  },
  methods: {
    showAvatar: Utils.showAvatar,
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
    loadCommentList(index, pageSize) {
      if(!pageSize){
        pageSize = 6
      }
      GET(
        `/api/post/${this.postId}/comment/${this.commentId}/reply/page/${index}?pageSize=${pageSize}`
      )
        .then(resp => {
          if(index == 1&&pageSize == 3){
            this.backReplyList = resp.data
          }
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