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
    }
}