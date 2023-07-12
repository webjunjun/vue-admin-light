import { createI18n } from 'vue-i18n'; // 国际化包
import zhCN from './translations/zhCN.json';
import enUS from './translations/enUS.json';

// 将zhCN文件的字段定义为主类型，其他类型文件必须包含这些字段
type MessageSchema = typeof zhCN;
// 定义支持的语言类型枚举值
enum LanguageValues {
  zh = 'zh',
  en = 'en',
}
const i18n = createI18n<[MessageSchema], LanguageValues>({
  legacy: false, // false vue3组合式api模式
  locale: 'en',
  fallbackLocale: 'zh', // 备用语言 语言出错选择中文
  messages: {
    zh: zhCN,
    en: enUS,
  },
});

export default i18n;
