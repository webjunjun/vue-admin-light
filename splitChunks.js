const splitChunk = {
  chunks: 'all',
  minSize: 20000, // 表示新分离的chunk必须大于20kb 单位是byte
  minChunks: 1, // 表示一个模块至少被1个chunk所包含才可分割
  maxAsyncRequests: 5, // 表示按需加载文件时，并行最大请求5个
  maxInitialRequests: 3, // 表示加载入口文件时，并行最大请求3个
  automaticNameDelimiter: '~', // 表示拆分出的chunk的名称连接符
  cacheGroups: {
    vue: {
      name: 'vue',
      filename: '[name].bundle.js',
      test: /[\\/]node_modules[\\/]vue[\\/]/,
      priority: 30
    },
    vuex: {
      name: 'vuex',
      filename: '[name].bundle.js',
      test: /[\\/]node_modules[\\/]vuex[\\/]/,
      priority: 30
    },
    'vue-router': {
      name: 'vue-router',
      filename: '[name].bundle.js',
      test: /[\\/]node_modules[\\/]vue-router[\\/]/,
      priority: 30
    },
    'element-ui': {
      name: 'element-ui',
      filename: '[name].bundle.js',
      test: /[\\/]node_modules[\\/]element-ui[\\/]/,
      priority: 30
    },
    vendor: {
      chunks: 'all',
      test: /node_modules/,
      name: 'vendor',
      filename: '[name].bundle.js',
      maxInitialRequests: 5,
      minSize: 0,
      priority: -20
    }
  }
}

module.exports = {
  splitChunk
}
