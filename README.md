# comment-vue

## 安装
```
yarn add @jx3box/jx3box-comment-ui
```
或
```
npm install @jx3box/jx3box-comment-ui
```

## ES6使用


```javascript
import Comments from "@jx3box/jx3box-comment-ui"
Vue.use(Comments)

// 获取文章id为100的评论
<Comment id="100" category="post"/>

// id 分类下的主键id, 比如　，如果该评论属于文章，那么id 应该为　文章的id, 如果该评论为试卷的评论，那么该id 应该为试卷的id
// category 评论所属分类，比如　文章，试卷，试题，百科等．
// 为了对消息通知有好， 一般消息wp_messages表中的sourceType需要什么就填什么，［文章除外，文章类型使用　'post', 服务器会进行处理，需要二次查询文章具体类别］
//　比如对于试卷的评论组件，comments表中的sourceType需要的是 paper 那么　category="paper"
```


## 单个文件使用

```
yarn build
```

然后引入 `dist/comment.umd.min.js`即可. demo 见 `dist/demo.html`


## 本地开发

```
yarn install
```

注意 cookie中需要加入有效token

```
yarn serve
```

## 旧版线上引用
对gh-pages发布release
```html
<script src="https://cdn.jsdelivr.net/gh/JX3BOX/jx3box-comment-ui@1.0.0/comment.umd.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JX3BOX/jx3box-comment-ui@1.0.0/comment.css" />
```