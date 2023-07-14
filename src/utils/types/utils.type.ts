// 数字枚举里变量可以使用数字赋值或者枚举里的值
// const foo: TimeNumber = TimeNumber.future 正确使用
// const foo: TimeNumber = 1 也是正确使用
export enum TimeNumber {
  future = 1,
  past = -1,
  now = 0
}

// 字符串枚举里变量只能使用枚举里的值
// const foo: LayoutValue = LayoutValue.classic 正确使用
// const foo: LayoutValue = 'classic' 错误使用
enum LayoutValue {
  classic = 'classic',
  columns = 'columns',
  transverse = 'transverse'
}

export type LayoutValueType = keyof typeof LayoutValue

export interface settingInterface {
  title: string
  baseUrl: string
  devBaseUrl: string
  TokenKey: string
  pagePermission: boolean
  btnPermissionBoolean: boolean
  multipleTabs: boolean
  layoutType: LayoutValueType
}
