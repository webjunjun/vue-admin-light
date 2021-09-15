'use strict'
const path = require('path')
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // proxyTable: {
    //   "/api": {
    //       target: "http://localhost", // 目标代理接口地址
    //       secure: false,
    //       changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
    //       ws: false, // 是否启用websocket
    //       pathRewrite: {
    //           "^/api": "/" // 是否重写匹配到的地址
    //       }
    //   }
    // },
    // dev server
    host: 'localhost', // process.env.HOST 域名
    port: 8080, // rocess.env.PORT 指定端口号
    autoOpenBrowser: true, // 首次运行自动打开浏览器
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: false, // 是否开启eslint
    showEslintErrorsInOverlay: false, // 是否显示eslint错误在浏览器
    devtool: 'source-map', // cheap-module-eval-source-map
    cacheBusting: true,
    cssSourceMap: true
  },
  build: {
    index: path.resolve(__dirname, '../dist/index.html'), // 打包后的入口文件
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true, // Source Maps
    devtool: '#source-map',
    productionGzip: false, // 是否开启Gzip压缩 开启请确保npm install --save-dev compression-webpack-plugin
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
