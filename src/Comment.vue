<template>
    <el-container class="c-comment">
        <el-main>
            <el-form ref="form" :model="newComment" class="c-comment-box">
                <el-form-item>
                    <el-input
                        rows="3"
                        type="textarea"
                        maxlength="300"
                        show-word-limit
                        v-model="newComment.content"
                        placeholder="参与讨论..."
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="onSubmit"
                        class="u-publish"
                        >发表评论</el-button
                    >
                </el-form-item>
            </el-form>

            <div
                v-for="item in commentList"
                :key="item.comment.id"
                class="c-comment-list"
            >
                <Avatar
                    :user-avatar="showAvatar(item.user.avatar)"
                    :user-href="item.user.id | profileLink"
                    :username="item.user.displayName"
                />
                <CommmentWithReply
                    :item="item"
                    :post-id="postId"
                    :power="commentPower"
                    @deteleComment="deteleComment"
                    :user-href="item.user.id | profileLink"
                    :username="item.user.displayName"
                />
            </div>

            <div class="c-comment-pages" v-if="commentList.length > 5">
                <div class="u-quickreply">
                    <el-form class="u-form" :inline="true" :model="newComment">
                        <el-form-item class="u-input">
                            <el-input
                                show-word-limit
                                v-model="newComment.content"
                                placeholder="参与讨论"
                            ></el-input>
                        </el-form-item>
                        <el-form-item class="u-btn">
                            <el-button type="primary" @click="onSubmit"
                                >提交</el-button
                            >
                        </el-form-item>
                    </el-form>
                </div>
                <div class="u-pages">
                    <el-pagination
                        style="text-align:right"
                        background
                        hide-on-single-page
                        @current-change="handleCurrentChange"
                        :current-page.sync="pager.index"
                        :page-size="pager.pageSize"
                        layout="prev, pager, next, total"
                        :total="pager.total"
                    ></el-pagination>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import { JX3BOX, Utils } from "@jx3box/jx3box-common";
import Avatar from "./components/avatar.vue";
import CommmentWithReply from "./components/comment-with-reply.vue";
import { GET, POST, DELETE } from "./service";
export default {
    name: "Comment",
    props: ["postId"],
    components: {
        Avatar,
        CommmentWithReply,
    },
    data: function() {
        return {
            commentPower: {
                allow: false,
                uid: -1,
            },
            commentList: [],
            showAvatar: Utils.showAvatar,
            newComment: {},
            pager: {
                index: 1,
                pageSize: 10,
                pageTotal: 1,
                total: 0,
            },
        };
    },
    methods: {
        deteleComment(id) {
            DELETE(`/api/post/${this.postId}/comment/${id}`)
                .then(() => {
                    this.$notify({
                        title: "",
                        message: "删除成功!",
                        type: "success",
                        duration: 3000,
                        position: "bottom-right",
                    });
                    this.reloadCommentList(this.pager.index);
                })
                .catch(() => {});
        },
        reloadCommentList(index) {
            GET(`/api/post/${this.postId}/comment/page/${index}`)
                .then((resp) => {
                    this.commentList = resp.data || [];
                    this.pager = resp.page;
                })
                .catch(() => {});
        },
        handleCurrentChange(gotoIndex) {
            this.reloadCommentList(gotoIndex);
        },
        onSubmit() {
            POST(`/api/post/${this.postId}/comment`, null, {
                content: this.newComment.content,
            })
                .then(() => {
                    this.$notify({
                        title: "",
                        message: "评论成功!",
                        type: "success",
                        duration: 3000,
                        position: "bottom-right",
                    });
                    this.newComment = {};
                    // 位于第一页时才去更新数据,否则没必要,等用户自己触发
                    if (this.pager.index == 1) {
                        this.reloadCommentList(this.pager.index);
                    }
                })
                .catch(() => {});
        },
    },
    filters: {
        profileLink: function(uid) {
            return Utils.authorLink(uid);
        },
    },
    mounted() {
        this.reloadCommentList(1);
        GET(`/api/post/${this.postId}/can-i-delete-comment`)
            .then((power) => {
                this.commentPower = power;
            })
            .catch(() => {});
    },
};
</script>

<style lang="less">
.c-comment .el-main {
    padding: 0;
}
.c-comment-box {
    margin: 12px 0;
    border-bottom: 1px solid #eee;
    textarea {
        font-family: inherit;
    }
    .u-publish {
        float: right;
    }
}

.c-comment-list {
    padding: 10px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
}

.c-comment-pages {
    *zoom: 1;
    &:after {
        content: "";
        display: table;
        clear: both;
    }
    .u-quickreply {
        float: left;
        input {
            width: 360px;
        }
    }
    .u-pages {
        float: right;
    }
}
@media screen and (max-width: 1024px) {
    .c-comment-pages {
        .u-quickreply {
            float: none;
        }
        .u-form {
            display: flex;
        }
        .u-input {
            flex-grow: 1;
            .el-form-item__content {
                display: block;
            }
            input {
                width: 100%;
            }
        }
        .u-btn {
        }
    }
}
</style>
