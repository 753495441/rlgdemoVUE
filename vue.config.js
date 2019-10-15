module.exports = {
  lintOnSave: false,

  // 开发服务器
  devServer: {
    // 替换/user前所有路径为target的内容
    proxy: {
      '/portal': {
        target: 'http://118.25.61.45:8089', // 后端服务器域名
        ws: true, // 是否代理websockets
        changeOrigin: true, // 设置同源 默认false，是否需要改变原始主机头为目标URL
      },
    },
    disableHostCheck: true
  },
};
