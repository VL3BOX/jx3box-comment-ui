
function fillZero(num){
    return num  > 9 ? num  : `0${num}`
}

function formatData(str){
    let d = new Date(str);
    return (
        d.getFullYear() +
        "-" +
        fillZero(d.getMonth() + 1) +
        "-" +
        fillZero(d.getDate()) +
        " " +
        fillZero(d.getHours()) +
        ":" +
        fillZero( d.getMinutes()) +
        ":" +
        fillZero(d.getSeconds())
    );
}

var Avatar = {
    props: ["avatarSize", "userAvatar", "userHref", "username"],
    template: `
        <div class="user-avatar">
            <div class="avatar">
            <el-avatar shape="square" :size="avatarSize" :src="userAvatar"></el-avatar>
            </div>
            <div class="name">
            <el-link type="primary" target="jx3box_user" :href="userHref">{{username}}</el-link>
            </div>
        </div>
    `
}

var CommentContentSimple = {
    props: ["postId", "commentId", "content", "date", "hasReply", "canDelete"],
    methods: {
        dataFormat(str) {
            return formatData(str)
        }
    },
    template: `
        <div class="comment-content">
            <div>{{content}}</div>
            <div class="comment-content-footer">
            <div style="float:right">
                <el-button
                v-if="canDelete"
                type="text"
                icon="el-icon-delete"
                size="mini"
                >删除</el-button>

                <el-button
                type="text"
                icon="el-icon-time"
                disabled
                size="mini"
                >{{dataFormat(date)}}</el-button>
            </div>
            </div>
        </div>
    `
}