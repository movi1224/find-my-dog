const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {     //middleware to proxy the frontend request to backend
            target: 'http://localhost:3011',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        })
    )
}