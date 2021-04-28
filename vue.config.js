const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    port: 9191,
    proxy:{
      '/api':{
        target: 'http://47.119.152.95:8888',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
  }
}
