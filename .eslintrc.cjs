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
    'indent': ['error', 2], // 缩进，空格
    'space-infix-ops': 'error', // 要求中缀操作符周围有空格
    'quotes': ['error', 'single', {
      allowTemplateLiterals: true
    }], // 强制使用一致的反勾号、双引号或单引号
    'quote-props': ['error', 'consistent-as-needed', {
      keywords: true
    }], // 要求对象字面量属性名称使用引号
    'key-spacing': ['error', {
      beforeColon: false,
      mode: 'strict'
    }], // 强制在对象字面量的键和值之间使用一致的空格
    'spaced-comment': ['error', 'always'], // 强制在注释中 // 或 /* 使用一致的空格
    'no-multi-spaces': ['error', { ignoreEOLComments: true }], // 禁止使用多个空格
    'keyword-spacing': ['error', { before: true, after: true }], // 强制在关键字前后使用一致的空格
    // 'space-before-function-paren': ['error', 'never'], // 函数声明、具名函数表达式、函数调用中，函数名和 `(` 之间不允许有空格。
    'space-in-parens': ['error', 'never'], // 禁止或强制圆括号内的空格
    'object-curly-spacing': ['error', 'always'], // 要求花括号内有空格 (除了 {})
    'space-before-blocks': ['error', 'always'], // 强制在块之前使用一致的空格
    'no-useless-return': 'error', // 禁止多余的 return 语句
    // 'no-lonely-if': 'error', // 禁止 if 语句作为唯一语句出现在 else 语句块中
    'arrow-spacing': ['error', { before: true, after: true }], // 要求箭头函数的箭头之前或之后有空格
    'comma-spacing': ['error', { before: false, after: true }], // 禁止在逗号前使用空格,要求在逗号后使用一个或多个空格
    'arrow-parens': ['error', 'as-needed'], // 要求箭头函数的参数使用圆括号
    'no-useless-escape': 'off', // 关闭禁用不必要的转义
    'vue/html-self-closing': ['error', {
      html: {
        'void': 'always',
        'normal': 'never',
        'component': 'always'
      },
      svg: 'never',
      math: 'never'
    }], // 强制执行自闭式
    // 'vue/max-attributes-per-line': ['error', {
    //   singleline: {
    //     max: 3
    //   },
    //   multiline: {
    //     max: 1
    //   }
    // }], // 强制每行的最大属性数
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: false,
      ignores: []
    }], // 执行一致的缩进
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'beside',
      multiline: 'below'
    }], // 强制第一个属性的位置
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'always'
    }], // 在标签的右括号之前要求或禁止换行
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    'vue/no-lone-template': ['error', {
      ignoreAccessible: false
    }], // 插值中强制统一间距
    'vue/attributes-order': ['error', {
      order: [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'GLOBAL',
        ['UNIQUE', 'SLOT'],
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'OTHER_ATTR',
        'EVENTS',
        'CONTENT'
      ],
      alphabetical: false
    }]// 强制执行属性顺序
  }
}
