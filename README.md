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
<Comment post-id="100"/>
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