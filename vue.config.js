const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 分析模板依赖大小用的，在开发时打开服务器
const CompressionWebpackPlugin = require('compression-webpack-plugin') // 打包时压缩代码成gzip，如果服务器开启了gzip可以大大压缩大小
const WebpackBar = require('webpackbar') // 显示打包进度条

const port = process.env.PORT || 8080
const fixRequestBody = function fixRequestBody(proxyReq, req, res) {
  // 重写代理的请求头信息
  console.log(proxyReq, req, res)
}

module.exports = defineConfig({
  transpileDependencies: true, // 对第三方依赖进行编译
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // 部署项目在哪个目录下
  outputDir: 'dist', // 编译后所在目录
  assetsDir: 'static', // 编译后静态资源目录，相对outputDir而言
  indexPath: 'index.html', // 编译后index.html所在路径，相对outputDir而言
  productionSourceMap: false, // 生产环境是否开启sourcemap，默认true是
  lintOnSave: false, // 关闭项目的eslint检查 true || false || 'error'
  chainWebpack: (config) => {
    // 通过 CDN 方式引入资源
    // config.externals({
    //   echarts: 'echarts',
    //   nprogress: 'NProgress'
    // })
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 要公用的scss的路径
          resources: './src/theme/default.module.scss'
        })
        .end()
    })
    // 解析icon组件的svg图片
    config.module
      .rule('svg')
      .exclude.add(path.resolve(__dirname, 'src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, 'src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  configureWebpack: (config) => {
    // 设置项目名
    config.name = '前端项目脚手架'
    Object.assign(config, {
      // 设置别名
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          // element-ui 表格组件不渲染的问题 详见: https://github.com/ElemeFE/element/issues/21984
          vue$: 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.vue', '.json']
      }
    })
    // 设置source-map
    if (process.env.NODE_ENV === 'production') {
      config.devtool = 'cheap-module-source-map'
    } else {
      config.devtool = 'eval-cheap-module-source-map'
    }
    // 打包进度条
    const allPlugins = [
      new WebpackBar({
        name: process.env.NODE_ENV === 'production' ? '正在打包' : '正在启动',
        color: '#fa8c16'
      })
    ]
    config.plugins.push(...allPlugins)
    if (process.env.NODE_ENV !== 'production') {
      // 非生产环境打开依赖分析
      config.plugins.push(
        new BundleAnalyzerPlugin({
          openAnalyzer: process.env.NODE_ENV !== 'production', // 是否打开浏览器
          analyzerMode: process.env.NODE_ENV === 'production' ? 'disabled' : 'server', // 分析使用哪种模式
          generateStatsFile: false, // 不构建分析文件
          defaultSizes: 'gzip',
          analyzerHost: '127.0.0.1', // 分析服务ip
          analyzerPort: 'auto', // 自动分配端口
          reportFilename: path.resolve(__dirname, 'analyzer/index.html')
        })
      )
    } else {
      config.plugins.push(new CompressionWebpackPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${['js', 'css', 'scss', 'less'].join('|')})$`),
        threshold: 10240, // 大于会10KB被压缩
        minRatio: 0.8 // 压缩率小于0.8的会被处理
      }))
    }
  },
  devServer: {
    // open: true, // 打包时自动打开浏览器
    // webpack-dev-server移除了useLocalIp这个字段
    // 因此如果需要浏览器打开localhost open应像下面这么配置
    open: [`http://localhost:${port}`],
    port, // 设置端口
    // host: '', // 设置本地host 可以设置成 local-ip | local-ipv4 | local-ipv6 | 任意的字符串
    https: false, // 是否启用https
    proxy: {
      '/apitest': {
        target: 'http://172.23.150.16:8761', // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        ws: false, // 是否启用websocket
        pathRewrite: {
          '^/api': ''
        },
        // 重写代理的请求头信息
        onProxyReq: fixRequestBody
      }
    },
    // 出现编译错误时 在浏览器里全屏覆盖
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  }
})
