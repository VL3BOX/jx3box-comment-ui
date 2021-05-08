module.exports = {
    "devServer": {
        "proxy": {
            "/api": {
                "target": process.env["DEV_SERVER"] == "true" ? "http://localhost:8000" : "https://next.jx3box.com",
                "onProxyReq": function (request) {
                    request.setHeader("origin", "");
                }
            }
        }
    }
}