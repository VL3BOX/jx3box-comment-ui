<template>
  <el-container>
    <el-main>
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
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import { JX3BOX } from "@jx3box/jx3box-common";
import { GET } from "./service";
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
      currentIndex: 1,
      defautlAvatar: JX3BOX.default_avatar,
      profileLink: JX3BOX.__Links.dashboard.profile + "/"
    };
  },
  mounted() {
    GET(`/api/comments/post/${this.postId}/page/${this.currentIndex}`)
      .then(resp => {
        this.commentList = resp.data;
      })
      .catch(() => {});
  }
};
</script>

<style scoped>
</style>