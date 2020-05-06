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

```
yarn install
```

然后 将`package.json`里的代理配置改为

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

`service.js`：

```
将
let domain = JX3BOX.__api
if(domain[domain.length-1] == "/"){
    domain = domain.substring(0, domain.length-1)
}

改为
let domain = "/"

```



即可使用线上数据。 【注意 cookie中需要加入有效token】


```
yarn serve
```