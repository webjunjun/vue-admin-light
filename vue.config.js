const path = require('path');
const { defineConfig } = require('@vue/cli-service');

const port = process.env.PORT || 8080;
const fixRequestBody = function (proxyReq, req, res) {
  // 重写代理的请求头信息
};

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // 部署项目在哪个目录下
  outputDir: 'dist', // 编译后所在目录
  assetsDir: 'static', // 编译后静态资源目录，相对outputDir而言
  indexPath: 'index.html', // 编译后index.html所在路径，相对outputDir而言
  productionSourceMap: false, // 生产环境是否开启sourcemap，默认true是
  lintOnSave: false, // 关闭项目的eslint检查 true || false || 'error'
  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 要公用的scss的路径
          resources: './src/theme/default.scss',
        })
        .end();
    });
  },
  configureWebpack: (config) => {
    // 设置项目名
    config.name = '前端项目脚手架';
    Object.assign(config, {
      // 设置别名
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
        extensions: ['.js', '.vue', '.json'],
      },
    });
    // 设置source-map
    if (process.env.NODE_ENV === 'production') {
      config.devtool = 'cheap-module-source-map';
    } else {
      config.devtool = 'eval-cheap-module-source-map';
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
      '/api': {
        target: 'http://172.23.150.16:8761', // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        ws: false, // 是否启用websocket
        pathRewrite: {
          '^/api': '',
        },
        // 重写代理的请求头信息
        onProxyReq: fixRequestBody,
      },
    },
    // 出现编译错误时 在浏览器里全屏覆盖
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});
