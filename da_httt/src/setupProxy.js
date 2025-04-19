const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://counting.hpcc.vn",
      changeOrigin: true,
      secure: true,
    })
  );
};
