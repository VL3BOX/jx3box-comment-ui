import Comment from "./src/Comment.vue"

Comment.install = function (Vue) {
    Vue.component(Comment.name, Comment)
}