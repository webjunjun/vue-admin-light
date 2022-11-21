module.exports = {
  // ignoreFiles: [], // 忽略的文件
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'], // 继承一些共享配置
  plugins: ['stylelint-order'],
  overrides: [
    // 若项目中存在scss文件，添加以下配置
    {
      files: 'src/**/*.scss',
      customSyntax: 'postcss-scss'
    },
    // 若项目中存在less文件，添加以下配置
    {
      files: 'src/**/*.less',
      customSyntax: 'postcss-less'
    }
  ],
  rules: {
    // css书写顺序
    'order/order': [
      'declarations',
      'custom-properties',
      'dollar-variables',
      'rules',
      'at-rules'
    ],
    // 其他规则
    'no-descending-specificity': null, // 关闭禁止特异性较低的选择器在特异性较高的选择器之后重写
    'no-empty-source': true, // 禁止空源码
    'property-no-vendor-prefix': [true, { ignoreProperties: ['background-clip'] }], // 禁止属性的浏览器引擎前缀 忽略background-clip
    'number-leading-zero': 'never', // 对于小于1的小数，要求或不允许前导零
    'number-no-trailing-zeros': true, // 不允许数字中的尾随零
    'length-zero-no-unit': true, // 不允许使用零长度的单位
    'value-list-comma-space-after': 'always', // 在逗号之后必须有一个空格
    'declaration-colon-space-after': 'always', // 声明的冒号后需要一个空格
    'value-list-max-empty-lines': 0, // 允许的最大相邻空行数量为0 属性间不允许存在空行
    'shorthand-property-no-redundant-values': true, // 禁止简写属性的冗余值
    'declaration-block-no-duplicate-properties': true, // 禁止声明块的重复属性
    'declaration-block-no-redundant-longhand-properties': true, // 禁止可合并为一个简写属性的扩写属性
    'declaration-block-semicolon-newline-after': 'always', // 要求在声明块的分号之后必须有换行符或不能有空白符
    'block-closing-brace-newline-after': 'always', // 要求在块的闭大括号之后必须有换行符或不能有空白符
    'media-feature-colon-space-after': 'always', // 要求在媒体功能的冒号之后必须有一个空格或不能有空白符
    'media-feature-range-operator-space-after': 'always', // 要求在媒体功能的范围运算符之后必须有一个空格或不能有空白符
    'at-rule-name-space-after': 'always', // 要求在@规则名之后必须有一个空格
    indentation: 2, // 指定2个空格缩进
    'no-eol-whitespace': true, // 禁止行尾空白符
    'string-no-newline': null, // 禁止字符串中的(未转义)换行符
    'selector-class-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)|(__[a-z0-9]+)*$', // 类选择器指定匹配模式
    'property-no-vendor-prefix': null,
    'selector-no-vendor-prefix': null,
    // 其他样式的顺序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'float',
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'margin-collapse',
      'margin-top-collapse',
      'margin-right-collapse',
      'margin-bottom-collapse',
      'margin-left-collapse',
      'overflow',
      'overflow-x',
      'overflow-y',
      'clip',
      'clear',
      'font',
      'font-family',
      'font-size',
      'font-smoothing',
      'osx-font-smoothing',
      'font-style',
      'font-weight',
      'hyphens',
      'src',
      'line-height',
      'letter-spacing',
      'word-spacing',
      'color',
      'text-align',
      'text-decoration',
      'text-indent',
      'text-overflow',
      'text-rendering',
      'text-size-adjust',
      'text-shadow',
      'text-transform',
      'word-break',
      'word-wrap',
      'white-space',
      'vertical-align',
      'list-style',
      'list-style-type',
      'list-style-position',
      'list-style-image',
      'pointer-events',
      'cursor',
      'background',
      'background-attachment',
      'background-color',
      'background-image',
      'background-position',
      'background-repeat',
      'background-size',
      'border',
      'border-collapse',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
      'border-color',
      'border-image',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'border-spacing',
      'border-style',
      'border-top-style',
      'border-right-style',
      'border-bottom-style',
      'border-left-style',
      'border-width',
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width',
      'border-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius',
      'border-top-left-radius',
      'border-radius-topright',
      'border-radius-bottomright',
      'border-radius-bottomleft',
      'border-radius-topleft',
      'content',
      'quotes',
      'outline',
      'outline-offset',
      'opacity',
      'filter',
      'visibility',
      'size',
      'zoom',
      'transform',
      'box-align',
      'box-flex',
      'box-orient',
      'box-pack',
      'box-shadow',
      'box-sizing',
      'table-layout',
      'animation',
      'animation-delay',
      'animation-duration',
      'animation-iteration-count',
      'animation-name',
      'animation-play-state',
      'animation-timing-function',
      'animation-fill-mode',
      'transition',
      'transition-delay',
      'transition-duration',
      'transition-property',
      'transition-timing-function',
      'background-clip',
      'backface-visibility',
      'resize',
      'appearance',
      'user-select',
      'interpolation-mode',
      'direction',
      'marks',
      'page',
      'set-link-source',
      'unicode-bidi',
      'speak'
    ]
  }
}
