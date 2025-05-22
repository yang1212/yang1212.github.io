const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/',
  devServer: {
    host: '0.0.0.0', // 或者设置为你的服务器的实际 IP 地址
    port: 8080,
    allowedHosts: 'all', // 允许所有主机名访问
    proxy: {
      '/api/content': {
        target: 'https://api.github.com/repos/yang1212/collection-about/contents',
        changeOrigin: true,
        pathRewrite: {
          '^/api/content/': ''
        },
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    }
  },
  transpileDependencies: true
})
