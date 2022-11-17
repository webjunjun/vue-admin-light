module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential', // 识别vue语法 并提供vue默认校验规则
    '@vue/airbnb'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': 'off',
    'no-plusplus': 'off',
    'max-len': ['error', {
      code: 120,
      tabWidth: 4,
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true
    }],
    'consistent-return': 'off',
    'no-useless-escape': 'off',
    'import/no-cycle': 'off',
    'no-unused-vars': ['error', {
      args: 'none'
    }],
    'vue/multi-word-component-names': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'no-param-reassign': ['error', {
      props: false
    }],
    'no-lonely-if': 'off',
    'no-restricted-globals': 'off',
    'import/prefer-default-export': 'off',
    // 关闭强制分号的位置
    'semi-style': 'off',
    // 禁止使用分号结尾
    semi: ['error', 'never', {
      beforeStatementContinuationChars: 'never'
    }],
    // 禁止最末尾使用逗号
    'comma-dangle': ['error', 'never'],
    // 不用加后缀的文件类型
    'import/extensions': ['error', 'always', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
      vue: 'never'
    }],
    // 允许短路求值、三元运算
    'no-unused-expressions': ['error', {
      allowShortCircuit: true,
      allowTernary: true
    }],
    'no-restricted-syntax': 'off'
  }
}
