const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  outputDir: 'docs',
  devServer: {
    host: '0.0.0.0', // 或者设置为你的服务器的实际 IP 地址
    port: 8080,
    allowedHosts: 'all', // 允许所有主机名访问
  },
  transpileDependencies: true
})
