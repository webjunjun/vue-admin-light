import { createI18n } from 'vue-i18n' // 国际化包
import zhCN from './translations/zhCN'
import enUS from './translations/enUS'

// 将zhCN文件的字段定义为主类型，其他类型文件必须包含这些字段
type MessageSchema = typeof zhCN
// 定义支持的语言类型枚举值
enum LanguageValues {
  zhCN = 'zh-CN',
  enUS = 'en-US'
}
const i18n = createI18n<[MessageSchema], LanguageValues>({
  legacy: false, // false vue3组合式api模式
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN', // 备用语言 语言出错选择中文
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  },
  // $n(1, 'decimal') 全局使用 无需在组件导入
  numberFormats: {
    'zh-CN': {
      // 货币 货币加上对应的符号
      currency: {
        style: 'currency',
        currency: 'CNY',
        notation: 'standard'
      },
      // 数字显示小数位数 9 转成 9.00
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      },
      // 百分数 0.1 转成 10%
      percent: {
        style: 'percent',
        useGrouping: false
      }
    },
    'en-US': {
      currency: {
        style: 'currency',
        currency: 'USD',
        notation: 'standard'
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      },
      percent: {
        style: 'percent',
        useGrouping: false
      }
    }
  },
  // 日期时间 $d(new Date(), 'short') 全局使用 无需在组件导入
  datetimeFormats: {
    'zh-CN': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric'
      }
    },
    'en-US': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric'
      }
    }
  }
})

export default i18n
