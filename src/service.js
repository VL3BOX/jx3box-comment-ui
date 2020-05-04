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

                throw new Error("错误:" + resp.statusText)
            case 403:

                throw new Error("错误:" + resp.statusText)
            case 406:

                throw new Error("错误:" + resp.statusText)
            default:

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