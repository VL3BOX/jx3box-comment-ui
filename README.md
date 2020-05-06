# comment-vue

## 安装
```
yarn add @jx3box/jx3box-comment-ui
```
或
```
npm install @jx3box/jx3box-comment-ui
```

## 使用


```javascript
import Comments from "@jx3box/jx3box-comment-ui"
Vue.use(Comments)

// 获取文章id为100的评论
<Comment post-id="100"/>
```


## 本地开发

将`package.json`里的代理配置改为

```
"vue": {
    "devServer": {
        "proxy": {
            "/api": {
                "target": "https://api.jx3box.com"
            }
        }
    }
}
```

即可使用线上数据库。 【注意 cookie中需要加入有效token】