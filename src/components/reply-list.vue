<template>
  <div class="c-comment-replylist" v-if="replyList.length">
    <reply-item
      class="c-comment-reply"
      v-for="reply in replyList"
      :key="reply.id"
      :reply="reply"
      :power="power"
      @deleteReply="deleteReply"
      @addReply="addReply"
    />
    <!-- 分页 -->
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
import { GET, DELETE, POST } from "../service";
import ReplyItem from "./reply-item";
export default {
  props: ["postId", "commentId", "originReplyList", "power"],
  components: {
    ReplyItem
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
        this.loadReplyList(this.pager.index);
      } else {
        this.loadReplyList(1, 3);
      }
    });
  },
  methods: {
    showAvatar: Utils.showAvatar,
    showMore() {
      this.showPager = true;
      this.loadReplyList(1);
    },
    showLess() {
      this.showPager = false;
      this.replyList = this.backReplyList;
    },
    handleCurrentChange(gotoIndex) {
      this.loadReplyList(gotoIndex);
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
            this.loadReplyList(this.pager.index);
          } else {
            this.loadReplyList(this.pager.index, 3);
          }
        })
        .catch(() => {});
    },
    addReply(data) {
      POST(
        `/api/post/${this.postId}/comment/${this.commentId}/reply`,
        null,
        data
      )
        .then(() => {
          this.$notify({
            title: "",
            message: "评论成功!",
            type: "success",
            duration: 3000,
            position: "bottom-right"
          });
          if (this.showPager) {
            this.loadReplyList(this.pager.index);
          } else {
            this.loadReplyList(this.pager.index, 3);
          }
        })
        .catch(() => {});
    },
    loadReplyList(index, pageSize) {
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
