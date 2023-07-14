const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api*',
        createProxyMiddleware({
            target: 'https://tiny-plum-coyote-vest.cyclic.app',
            changeOrigin: true
        })
    );
};
