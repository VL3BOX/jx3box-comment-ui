import Comment from "./src/Comment.vue"

const install = function (Vue) {
    Vue.component(Comment.name, Comment)
}
export default {
    install
}