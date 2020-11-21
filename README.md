# comment-vue

## 1.安装
```
npm --registry https://registry.npmjs.org install @jx3box/jx3box-comment-ui
```

## 2.引入

```javascript
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
```

## 3.调用
```
<Comment :id="id" category="wiki" />
```
id 分类下的主键id, 比如　，如果该评论属于文章，那么id 应该为　文章的id, 如果该评论为试卷的评论，那么该id 应该为试卷的id  
category 评论所属分类，比如　文章，试卷，试题，百科等．  
为了对消息通知有好， 一般消息 wp_messages 表中的sourceType需要什么就填什么，［文章除外，文章类型使用　'post', 服务器会进行处理，需要二次查询文章具体类别］  
比如对于试卷的评论组件， wp_messages 表中的sourceType需要的是 paper 那么　category="paper"  


## 旧版线上引用
对gh-pages发布release
```html
<script src="https://cdn.jsdelivr.net/gh/JX3BOX/jx3box-comment-ui@1.0.0/comment.umd.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JX3BOX/jx3box-comment-ui@1.0.0/comment.css" />
```
