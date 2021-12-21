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
<Comment :id="id" category="wiki" order="desc" />
```
+ category : 评论所属分类，一般使用应用标识符，比如文章post、试卷paper、百科wiki等
+ id : 分类下的主键id
+ order: 排序类型，默认为 asc， 可选 desc

> 为了对消息通知友好， 一般消息 wp_messages 表中的sourceType需要什么就填什么，［文章除外，文章类型使用　'post', 服务器会进行处理，需要二次查询文章具体类别］  
比如对于试卷的评论组件， wp_messages 表中的sourceType需要的是 paper 那么　category="paper"  


## 旧版线上引用
对gh-pages发布release
```html
<script src="https://cdn.jsdelivr.net/gh/JX3BOX/jx3box-comment-ui@1.0.0/comment.umd.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JX3BOX/jx3box-comment-ui@1.0.0/comment.css" />
```

## 使用评论的项目
+ cms (macro,jx3dat,fb,bps,tool,bbs,share)
+ bbs (exam,collection,emotion,joke)
+ wiki (item,knowledge,quest)
+ app (pz,team,battle,dbm)