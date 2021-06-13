module.exports = {
    "devServer": {
        "proxy": {
            "/api/cms": {
                "target": process.env["DEV_SERVER"] == "true" ? "http://localhost:5120" : "https://cms.jx3box.com",
            },
            "/api": {
                "target": process.env["DEV_SERVER"] == "true" ? "http://localhost:8000" : "https://next.jx3box.com",
                "onProxyReq": function (request) {
                    request.setHeader("origin", "");
                }
            },
        }
    },
    chainWebpack: config => {
        // 覆写 v-html 
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.directives = {
                    html(node, directiveMeta) {
                        (node.props || (node.props = [])).push({
                            name: "innerHTML",
                            value: `xss(_s(${directiveMeta.value}))`
                        });
                    }
                };
                return options
            })
    }
}