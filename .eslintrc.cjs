/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['vue', 'prettier'],
  rules: {
    "prettier/prettier": ["error", 
    // prettier 规则配置
    {
      'endOfLine': 'auto', // 换行cr检查
      'printWidth': 120, // 每行最多120字
      'semi': false, // 不使用分号
      'singleQuote': true, // 单引号
      'tabWidth': 2, // tab键是2个空格
      'trailingComma': 'none', // 末尾不强制要求逗号
      'bracketSpacing': true // 在一行的object里花括号前后使用空格 { foo: bar }
    }],
    // airbnb
    'import/no-unresolved': 'off', // 引入模块路径检查（vue难以解析路径）
    'import/extensions': 'off', // import文件不加后缀检查
    'import/no-extraneous-dependencies': 'off', // 无外来依赖检查（要求只能用npm依赖，导致无法使用cdn）
    'import/prefer-default-export': 'off', // 优先使用export default
    // eslint
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产时无console语句
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产时无debugger关键字
    'linebreak-style': 'off', // 换行检查
    'func-names': 'off', // 函数必须命名（导致匿名函数无法使用）
    'no-restricted-syntax': 'off', // 禁用特定语法（导致一些语法无法使用：for of）
    'no-use-before-define': ['error', { // 函数必须先定义后使用
      'functions': false
    }],
    'no-plusplus': 'off', // 禁用 ++ --
    'no-continue': 'off', // 禁用 continue
    'no-param-reassign': 'off', // 禁止函数的参数重写赋值
    'class-methods-use-this': 'off', // class中的方法必须使用this
    'no-unused-expressions': 'off',
    'semi': ['error', 'never'], // 永远不使用分号
    'comma-dangle': ['error', {
      'arrays': 'never',
      'objects': 'never',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never'
    }],
    // vue
    'vue/multi-word-component-names': 'off'
  }
}
