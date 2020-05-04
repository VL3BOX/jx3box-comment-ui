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
        <el-row>
          <el-col :span="2">
            <div>
              <el-avatar shape="square" :size="68" :src="defautlAvatar"></el-avatar>
            </div>
            <div>
              <el-link
                type="primary"
                target="jx3box_user"
                :href="profileLink + item.comment.userId"
              >{{item.comment.author}}</el-link>
            </div>
          </el-col>
          <el-col :span="22">
            <div>{{item.comment.content}}</div>
            <div>
              <span>{{dataForamt(item.comment.commentDate)}}</span>
              <span>回复</span>
            </div>
            <div v-if="item.reply">
              <el-divider></el-divider>
              <el-card v-for="reply in item.reply" :key="reply.id">
                <el-row>
                  <el-col :span="2">
                    <div>
                      <el-avatar shape="square" :size="34" :src="defautlAvatar"></el-avatar>
                    </div>
                    <div>
                      <el-link
                        type="primary"
                        target="jx3box_user"
                        :href="profileLink + reply.userId"
                      >{{reply.author}}</el-link>
                    </div>
                  </el-col>
                  <el-col :span="22">
                    <div>{{reply.content}}</div>
                    <div>
                      <span>{{dataForamt(reply.commentDate)}}</span>
                      <span>回复</span>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
              <div v-if="item.reply.length >= 3">
                <div>查看更多</div>
              </div>
            </div>
          </el-col>
        </el-row>
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
    dataForamt(str) {
      let d = new Date(str);
      return (
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds()
      );
    },
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