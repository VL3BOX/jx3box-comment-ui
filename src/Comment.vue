<template>
    <el-container class="c-comment">
        <el-main>
            <CommentInputForm @submit="userSubmitInputForm" />

            <div
                v-for="item in commentList"
                :key="item.id"
                class="c-comment-list"
            >
                <Avatar
                    :user-avatar="showAvatar(item.avatar)"
                    :user-href="item.userId | profileLink"
                    :username="item.displayName"
                />
                <CommmentWithReply
                    :base-api="baseAPI"
                    :item="item"
                    :category="category"
                    :power="commentPower"
                    @deteleComment="deteleComment"
                    :user-href="item.userId | profileLink"
                    :username="item.displayName"
                />
            </div>

            <div class="c-comment-pages">
                <CommentInputForm
                    @submit="userSubmitInputForm"
                    v-if="commentList.length > 5"
                />
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
import { Utils } from "@jx3box/jx3box-common";
import Avatar from "./components/avatar.vue";
import CommentInputForm from "./components/comment-input-form.vue";
import CommmentWithReply from "./components/comment-with-reply.vue";
import { GET, POST, DELETE } from "./service";
export default {
    name: "Comment",
    props: ["id", "category"],
    components: {
        Avatar,
        CommmentWithReply,
        CommentInputForm,
    },
    data: function() {
        return {
            baseAPI: "",
            commentPower: {
                allow: false,
                uid: -1,
            },
            commentList: [],
            showAvatar: Utils.showAvatar,
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
            DELETE(`${this.baseAPI}/comment/${id}`)
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
            GET(`${this.baseAPI}/comment/page/${index}`)
                .then((resp) => {
                    this.commentList = resp.data || [];
                    this.pager = resp.page;
                })
                .catch(() => {});
        },
        handleCurrentChange(gotoIndex) {
            this.reloadCommentList(gotoIndex);
        },
        userSubmitInputForm(data) {
            POST(`${this.baseAPI}/comment`, null, data)
                .then(() => {
                    this.$notify({
                        title: "",
                        message: "评论成功!",
                        type: "success",
                        duration: 3000,
                        position: "bottom-right",
                    });
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
    created() {
        this.baseAPI = `/api/comment/${this.category}/article/${this.id}`;
    },
    mounted() {
        this.reloadCommentList(1);

        GET(`${this.baseAPI}/i-am-author`)
            .then((power) => {
                this.commentPower = power;
            })
            .catch(() => {});
    },
};
</script>

<style lang="less">
.u-uploader {
    margin-top: 10px;
}
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
        margin-top: 10px;
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
