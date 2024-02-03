<template>
    <el-container class="c-comment" v-loading="loading">
        <el-main>
            <CommentInputForm @submit="userSubmitInputForm" />
            <div class="c-comment-panel">
                <div class="u-order">
                    <span class="u-label">{{ $t('排序模式：') }}</span>
                    <el-radio-group
                        v-model="isDesc"
                        @change="changeOrder"
                        size="mini"
                    >
                        <el-radio-button label="DESC">{{ $t('最后靠前') }}</el-radio-button>
                        <el-radio-button label="ASC">{{ $t('最早靠前') }}</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="u-op">
                    <el-switch
                        class="c-comment-panel-likes"
                        v-model="orderByLikes"
                        @change="changeOrderByLikes"
                        :active-text="$t('获赞靠前')"
                    >
                    </el-switch>
                    <el-switch
                        class="c-comment-panel-likes"
                        v-model="openWhiteList"
                        @change="changeWhiteList"
                        v-if="commentPower.is_author || commentPower.is_editor"
                        :active-text="$t('开启过滤')"
                        :title="$t('开启过滤后，仅设为显示的评论可被其他人所见')"
                    >
                    </el-switch>
                </div>
            </div>
            <template v-if="isNormal">
                <div
                    v-for="item in commentList"
                    :key="item.id"
                    class="c-comment-list"
                >
                    <CommentAvatar
                        :user-avatar="item.avatar | showAvatar"
                        :user-href="item.userId | profileLink"
                        :username="item.displayName"
                        :avatarFrame="item.user_avatar_frame"
                        :withFrame="true"
                        :avatarSize="48"
                    />
                    <CommentAndReply
                        :base-api="baseAPI"
                        :item="item"
                        :category="category"
                        :power="commentPower"
                        @deleteComment="deleteComment"
                        @setTopComment="setTopComment"
                        @setStarComment="setStarComment"
                        @setWhiteComment="setWhiteComment"
                        @setLikeComment="setLikeComment"
                        @hide="hideComment"
                        :user-href="item.userId | profileLink"
                        :username="item.displayName"
                    />
                </div>

                <div class="c-comment-pages">
                    <CommentInputForm
                        @submit="userSubmitInputForm"
                        :isBottom="commentList.length > 5"
                        v-if="commentList.length > 5"
                    />
                    <div class="u-pages">
                        <el-pagination
                            style="text-align: right"
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
            </template>
        </el-main>
    </el-container>
</template>

<script>
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
import CommentAvatar from "./components/avatar.vue";
import CommentInputForm from "./components/comment-input-form.vue";
import CommentAndReply from "./components/comment-and-reply.vue";
import { GET, POST, DELETE, PUT } from "./service";
import { getOrderMode, setOrderMode } from "./options";
export default {
    name: "Comment",
    props: ["id", "category", "normal", "order"],
    components: {
        CommentAvatar,
        CommentAndReply,
        CommentInputForm,
    },
    data: function () {
        return {
            baseAPI: "",
            commentPower: {
                allow: false,
                uid: -1,
            },
            commentList: [],
            pager: {
                index: 1,
                pageSize: 10,
                pageTotal: 1,
                total: 0,
            },
            isDesc: "DESC",
            orderByLikes: false,
            openWhiteList: false,
            loading: false,
        };
    },
    computed: {
        isNormal: function () {
            return this.normal === undefined || this.normal;
        },
    },
    methods: {
        changeOrder() {
            this.reloadCommentList(this.pager.index);
            setOrderMode(this.isDesc === "ASC" ? "DESC" : "ASC");
        },
        changeOrderByLikes() {
            this.reloadCommentList(this.pager.index);
            // setOrderMode(this.orderByLikes ? false : true);
        },
        changeWhiteList() {
            PUT(
                `${this.baseAPI}/meta/white-list/${
                    this.openWhiteList ? "open" : "close"
                }`
            ).then(()=>{
                return this.reloadPower()
            })
                .then(() => {
                    this.commentPower.is_white = this.openWhiteList;
                    this.reloadCommentList(this.pager.index);
                })
                .catch(() => {});
        },
        setLikeComment(id, isLike) {
            var action = isLike ? "like" : "unlike";
            PUT(`${this.baseAPI}/comment/${id}/${action}`)
                .then(() => {
                    //  this.reloadCommentList(this.pager.index);
                })
                .catch(() => {});
        },
        setTopComment(id, setTop) {
            var action = setTop ? "set" : "cancel";
            PUT(`${this.baseAPI}/comment/${id}/top/${action}`)
                .then(() => {
                    this.reloadCommentList(this.pager.index);
                })
                .catch(() => {});
        },
        setStarComment(id, setStar) {
            var action = setStar ? "set" : "cancel";
            PUT(`${this.baseAPI}/comment/${id}/star/${action}`)
                .then(() => {
                    this.reloadCommentList(this.pager.index);
                })
                .catch(() => {});
        },
        setWhiteComment(id, setWhite) {
            // 设置某个评论为精选
            var action = setWhite ? "add" : "remove";
            PUT(`${this.baseAPI}/comment/${id}/white-list/${action}`)
                .then(() => {
                    this.reloadCommentList(this.pager.index);
                })
                .catch(() => {});
        },
        deleteComment(id) {
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
        hideComment(id) {
            PUT(`${this.baseAPI}/comment/${id}/hide`)
                .then(() => {
                    this.$notify({
                        title: "",
                        message: "操作成功!",
                        type: "success",
                        duration: 3000,
                        position: "bottom-right",
                    });
                    this.reloadCommentList(this.pager.index);
                })
                .catch(() => {});
        },
        reloadCommentList(index) {
            this.loading = true;
            let orderQuery = {};
            if (this.isDesc === "DESC") {
                orderQuery["desc"] = true;
            }
            orderQuery["orderby_likes"] = this.orderByLikes;
            GET(`${this.baseAPI}/comment/page/${index}`, orderQuery)
                .then((resp) => {
                    this.commentList = resp.data || [];
                    this.pager = resp.page;
                })
                .catch(() => {})
                .finally(() => {
                    this.loading = false;
                });
        },
        handleCurrentChange(gotoIndex) {
            this.reloadCommentList(gotoIndex);
        },
        userSubmitInputForm(data) {
            POST(`${this.baseAPI}/comment`, null, data)
                .then((responseJSON) => {
                    if (responseJSON && ~~responseJSON.code > 0) {
                        this.$notify({
                            title: "评论失败",
                            message: responseJSON.msg || "",
                            type: "error",
                            duration: 3000,
                            position: "bottom-right",
                        });
                        return;
                    }
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
        reloadPower(){
            GET(`${this.baseAPI}/i-am-author`)
                    .then((power) => {
                        this.commentPower = power;
                        this.openWhiteList = power.is_white;
                    })
                    .catch(() => {});
        }
    },
    filters: {
        profileLink: function (uid) {
            return authorLink(uid);
        },
        showAvatar: function (val) {
            return showAvatar(val, 144);
        },
    },
    created() {
        this.baseAPI = `/api/comment/${this.category}/article/${this.id}`;
    },
    mounted() {
        getOrderMode()
            .then((mode) => {
                this.isDesc = mode;
            })
            .then(() => {
               this.reloadPower()
            })
            .finally(() => {
                this.reloadCommentList(1);
            });
    },
};
</script>

<style lang="less">
.c-comment {
    font-size: 14px;
    .el-link {
        vertical-align: baseline !important;
    }
    .el-icon-circle-close {
        color: #fff !important;
    }
}
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

.c-comment-tools {
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 48px;

    .u-upload-icon {
        font-size: 24px;
        cursor: pointer;
        margin-right: 10px;
        // margin-left: 10px;
        color: #3d454d;

        &:hover {
            color: #23ade5;
        }
    }
    .c-jx3box-emotion {
        margin: 0;
        position: relative;
        top: 7px;
    }
    .c-comment-emotion {
        overflow: hidden;
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
        /* .u-btn {
        } */
    }
}
.c-comment-panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fafbfc;
    padding: 8px 10px;
    border-radius: 3px;
    border: 1px solid #eee;
    margin: 10px 0;
    .u-label {
        color: #666;
        margin-right: 10px;
    }
    b {
        color: #0366d6;
    }
}
.c-comment-emotion {
    max-height: 168px;
    overflow: auto;
}
.c-comment-panel-likes {
    margin-left: 10px;
}
.c-comment-alert {
    color: #e6a23c;
    margin-left: 10px;
    font-size: 12px;
}
@media screen and (max-width: 720px) {
    .c-comment-panel {
        .u-op{
            display: none;
        }
    }
}
</style>
