import { TimeNumber } from './types/utils.type'

/**
 * 时间戳转换成时间
 * @param {number} times 时间戳
 * @param {number} num 分割位数
 * num = 16 2020-02-24 01:00
 * num = 10 2020-02-24
 */
const timetrans = (times: number, num: number): string => {
  const setNum: number = num || 16
  const date: Date = new Date(times + 8 * 3600 * 1000) // 增加8小时
  // date.toJSON().substr(0, setNum).replace('T', ' ');
  return date.toJSON().substring(0, setNum).replace('T', ' ')
}

/**
 * 校验手机号
 * @param {number | string} cellphone 手机号码
 */
const checkCellphone = (cellphone: number | string): boolean => {
  const reg: RegExp = /^1[3|4|5|6|7|8][0-9]{9}$/
  const flag: boolean = reg.test('' + cellphone)
  return flag
}

/**
 * 检验身份证
 * @param {number | string} idCard 身份证号码
 */
const isIdCardNo = (idCard: number | string): boolean | undefined => {
  // 15位和18位身份证号码的正则表达式
  const regIdCard: RegExp =
    /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
  // 如果通过该验证，说明身份证格式正确，但准确性还需计算
  const curIDCard: string = '' + idCard
  if (regIdCard.test(curIDCard)) {
    if (curIDCard.length === 18) {
      const idCardWi: Array<number> = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 将前17位加权因子保存在数组里
      const idCardY: Array<number> = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2] // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
      let idCardWiSum: number | bigint = 0 // 用来保存前17位各自乖以加权因子后的总和
      for (let i = 0; i < 17; i++) {
        idCardWiSum += Number(curIDCard.substring(i, i + 1)) * idCardWi[i]
      }
      const idCardMod: number | bigint = idCardWiSum % 11 // 计算出校验码所在数组的位置
      const idCardLast: string = curIDCard.substring(17) // 得到最后一位身份证号码
      // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod === 2) {
        if (idCardLast === 'X' || idCardLast === 'x') {
          return true
        }
        return false
      }
      // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
      if (idCardLast === '' + idCardY[idCardMod]) {
        return true
      }
      return false
    }
  } else {
    return false
  }
}

/**
 * 校验邮箱
 * @param {string} mail 邮箱
 */
const checkMail = (mail: string): boolean => {
  const reg: RegExp = /^([A-z0-9]{6,18})(\w|-)+@[A-z0-9]+\.([A-z]{2,3})$/
  const flag: boolean = reg.test(mail)
  return flag
}

/**
 * 时间分割
 * yyyy年mm月dd日 - dd日
 * yyyy年mm月dd日 - mm月dd日
 * yyyy年mm月dd日 - yyyy年mm月dd日
 * @param {string} startDate 开始时间
 * @param {string} endDate 结束时间
 */
const transRangeDate = (startDate: string, endDate: string): string => {
  const startArr: string[] = startDate.split('-')
  const endArr: string[] = endDate.split('-')
  const tempStart: Date = new Date(startDate.replace(/-/g, '/'))
  const tempEnd: Date = new Date(endDate.replace(/-/g, '/'))
  if (tempStart.getFullYear() < tempEnd.getFullYear()) {
    return `${startArr[0]}年${startArr[1]}月${startArr[2]}日 - ${endArr[0]}年${endArr[1]}月${endArr[2]}日`
  }
  if (tempStart.getMonth() < tempEnd.getMonth()) {
    return `${startArr[0]}年${startArr[1]}月${startArr[2]}日 - ${endArr[1]}月${endArr[2]}日`
  }
  return `${startArr[0]}年${startArr[1]}月${startArr[2]}日 - ${endArr[2]}日`
}

/**
 * 手机号隐藏中间4位
 * @param {string} phone 手机号
 */
const hidePhone = (phone: string): string => {
  const reg: RegExp = /^(\d{3})\d{4}(\d{4})$/
  const newPhone: string = phone.replace(reg, '$1 **** $2')
  return newPhone
}

/**
 * 是否外部链接
 * @param {string} path
 * @returns {boolean}
 */
const isExternal = (path: string): boolean => /^(https?:|mailto:|tel:)/.test(path)

/**
 * 获取今天、明天、后天、昨天、前天等指定日期
 * 0 今天，1 明天，2 后天，-1 昨天，-2 前天
 * @param {number} AddDayCount
 * @return {string}
 */
const getDateStr = (AddDayCount: number): string => {
  const dd: Date = new Date()
  dd.setDate(dd.getDate() + AddDayCount)
  const y: number = dd.getFullYear()
  const m: number = dd.getMonth() + 1
  const _m: string | number = m.toString()[1] ? m : `0${m}`
  const d: number = dd.getDate()
  const _d: string | number = d.toString()[1] ? d : `0${d}`
  return y + '-' + _m + '-' + _d
}

/**
 * 判断时间是在两个时间之间，还是之前或者之后
 * @param  {string} date 要比较的时间
 * @param  {string} start 起始时间
 * @param  {string} end 结束时间
 * @return {TimeNumber}
 */
const timeIsBetween = (date: string, start: string, end: string): TimeNumber => {
  const dateNow: Date = new Date(date) // 获取当前时间
  const dateBegin: Date = new Date(start) // 将-转化为/，使用new Date
  const dateEnd: Date = new Date(end) // 将-转化为/，使用new Date
  const beginDiff: number = dateNow.getTime() - dateBegin.getTime() // 时间差的毫秒数
  const beginDayDiff: number = Math.floor(beginDiff / (24 * 3600 * 1000)) // 计算出相差天数
  const endDiff: number = dateEnd.getTime() - dateNow.getTime() // 时间差的毫秒数
  const endDayDiff: number = Math.floor(endDiff / (24 * 3600 * 1000)) // 计算出相差天数
  if (endDayDiff < 0) {
    // 已过期
    return -1
  }
  if (beginDayDiff < 0) {
    // 还没到时间
    return 1
  }
  // 两者之间
  return 0
}

/**
 * 校验车牌号
 * @param  {string} vehicleNumber 参数说明
 * @return {boolean}
 */
const isVehicleNumber = (vehicleNumber: string): boolean => {
  // 新能源车
  const xreg: RegExp =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
  // 普通汽车
  const creg: RegExp =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/

  if (vehicleNumber.length == 7) {
    return creg.test(vehicleNumber)
  } else if (vehicleNumber.length == 8) {
    return xreg.test(vehicleNumber)
  } else {
    return false
  }
}

export {
  timetrans,
  checkCellphone,
  isIdCardNo,
  checkMail,
  transRangeDate,
  hidePhone,
  isExternal,
  getDateStr,
  timeIsBetween,
  isVehicleNumber
}
