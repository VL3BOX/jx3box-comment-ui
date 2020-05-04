import { Notification } from 'element-ui';
import { JX3BOX } from "@jx3box/jx3box-common"
export const GET = function (url, queryParams) {
    let options = {
        "method": "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    return __fetch(url, queryParams, options)

}

export const POST = function (url, queryParams, body) {
    let options = {
        "method": "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    return __fetch(url, queryParams, options)
}


export const DELETE = function (url, queryParams) {
    let options = {
        "method": "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return __fetch(url, queryParams, options)
}

function __fetch(url, queryParams, options) {

    if (queryParams) {
        let queryQueue = []
        Object.keys(queryParams).forEach((key) => {
            queryQueue.push(key + "=" + queryParams[key])
        })
        url = url + "?" + queryQueue.join("&")
    }

    return fetch(url, options).then((resp) => {
        switch (resp.status) {
            case 200:
                break
            case 401:
                window.location.href = JX3BOX.__Links.account.login + "?redirect=" + encodeURIComponent(window.location.href)
                throw new Error("错误:" + resp.statusText)
            case 403:
                window.location.href = JX3BOX.__Links.account.login + "?redirect=" + encodeURIComponent(window.location.href)
                throw new Error("错误:" + resp.statusText)
            case 423:
                window.location.href = JX3BOX.__Links.account.email_verify + "?redirect=" + encodeURIComponent(window.location.href)
                throw new Error("错误:" + resp.statusText)
            case 406:
                resp.text().then((body) => {
                    Notification.warning({
                        title: "系统",
                        message: body || "提交内容不合法,请重新提交",
                        type: "success",
                        duration: 3000,
                        position: "bottom-right"
                    })
                })

                throw new Error("错误:" + resp.statusText)
            default:
                resp.text().then((body) => {
                    Notification.error({
                        title: "系统:" + resp.statusText,
                        message: body || "系统错误,请稍后重试!",
                        duration: 3000,
                        position: "bottom-right"
                    })
                })

                throw new Error("错误:" + resp.statusText)
        }
        let contentType = resp.headers.get("Content-Type")
        contentType = contentType && contentType.split(";").shift()
        switch (contentType) {
            case "application/json":
                return resp.json()
            default:
                return resp.text()
        }
    })
}