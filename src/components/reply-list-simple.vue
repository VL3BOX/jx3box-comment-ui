<template>
  <div>
    <el-divider></el-divider>
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
  </div>
</template>

<script>
import { JX3BOX } from "@jx3box/jx3box-common";

import CommentContent from "./comment-content.vue";
import Avatar from "./avatar.vue";
export default {
  props: ["replyList", "postId"],
  components: {
    Avatar,
    CommentContent
  },
  data: function() {
    return {
      defautlAvatar: JX3BOX.default_avatar,
      profileLink: JX3BOX.__Links.dashboard.profile + "/"
    };
  }
};
</script>


<style scoped>
.comment-need-bg {
  background-color: #f8f8f8;
}
</style>