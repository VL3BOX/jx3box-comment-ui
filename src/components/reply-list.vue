<template>
  <div class="c-comment-replylist" v-if="replyList.length">
    <el-row class="c-comment-reply" v-for="reply in replyList" :key="reply.id">
      <Avatar
        :user-avatar="showAvatar(reply.avatar)"
        :user-href="reply.userId | profileLink"
        :username="reply.displayName"
      />
      <CommentContentSimple
        :post-id="postId"
        :comment-id="reply.id"
        :date="reply.commentDate"
        :content="reply.content"
        :can-delete="power.allow || power.uid == reply.userId"
        :can-reply="power.uid != reply.userId"
        :userId="reply.userId"
        @deleteReply="deleteReply"
      />
    </el-row>
    <el-row>
      <el-col :span="1" v-if="replyList.length >= 3 || showPager">
        <el-button type="text" v-show="showPager" @click="showLess()">收起</el-button>
        <el-button type="text" v-show="!showPager" @click="showMore()">查看更多</el-button>
      </el-col>
      <el-col :span="23" class="c-comment-reply-pages">
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
import { Utils } from "@jx3box/jx3box-common";
import { GET, DELETE } from "../service";
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
  filters: {
    profileLink: function(uid) {
      return Utils.authorLink(uid);
    }
  },
  mounted() {
    this.backReplyList = this.originReplyList || [];
    this.replyList = this.backReplyList;
    this.$on("refresh", () => {
      if (this.showPager) {
        this.loadCommentList(this.pager.index);
      } else {
        this.loadCommentList(1, 3);
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
    deleteReply(id) {
      DELETE(`/api/post/${this.postId}/comment/${id}`)
        .then(() => {
          this.$notify({
            title: "",
            message: "删除成功!",
            type: "success",
            duration: 3000,
            position: "bottom-right"
          });

          if (this.showPager) {
            this.loadCommentList(this.pager.index);
          } else {
            this.loadCommentList(this.pager.index, 3);
          }
        })
        .catch(() => {});
    },
    loadCommentList(index, pageSize) {
      if (!pageSize) {
        pageSize = 6;
      }
      GET(
        `/api/post/${this.postId}/comment/${this.commentId}/reply/page/${index}?pageSize=${pageSize}`
      )
        .then(resp => {
          if (index == 1 && pageSize == 3) {
            this.backReplyList = resp.data;
          }
          this.replyList = resp.data;
          this.pager = resp.page;
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less">
.c-comment-replylist {
  padding: 10px 0;
  border-top: 1px dashed #eee;
}
.c-comment-reply {
  border-bottom: 1px dashed #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;

  .c-comment-avatar {
    margin-right: 10px;
    width: auto;
  }
  .u-avatar {
    float: left;
  }
  .u-avatar-pic {
    width: 28px;
    height: 28px;
    margin-right: 10px;
  }

  .u-name {
    font-size: 12px;
    line-height: 28px;
    padding: 0 !important;
    display: inline;
    white-space: nowrap;
  }

  .u-reply {
    padding: 5px;
    line-height: 1.715;
  }
}
.c-comment-reply-pages {
  padding: 7px 0;
}
</style>
