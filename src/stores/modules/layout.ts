import { defineStore } from 'pinia'
import store from '@/stores'
import { LayoutValueType } from '@/utils/types/utils.type'
import { setting } from '@/utils/setting'
import { computed, reactive, toRefs } from 'vue'

// 一般pinia会自动判断类型，复杂的数据还是需要自己定义
interface LayoutTypeState {
  currentLayoutValue: LayoutValueType
}

// 以state、getters、actions分区域的方式实现
// 第一个参数id必须是唯一的
// export const useLayoutStore = defineStore('layout', {
//   state: (): LayoutTypeState => ({
//     currentLayoutValue: setting.layoutType
//   }),
//   getters: {
//     computedValue(): LayoutValueType {
//       return this.currentLayoutValue
//     }
//   },
//   actions: {
//     changeLayoutType(type: LayoutValueType) {
//       this.currentLayoutValue = type
//     }
//   }
// })

// 以函数的形式实现 推荐
export const useLayoutStore = defineStore('layout', () => {
  const state = reactive<LayoutTypeState>({
    currentLayoutValue: setting.layoutType
  })

  const computedValue = computed(() => state.currentLayoutValue)

  const changeLayoutType = (type: LayoutValueType) => {
    state.currentLayoutValue = type
  }

  return {
    ...toRefs(state),
    computedValue,
    changeLayoutType
  }
})

// 在setup外使用
export const useLayoutStoreHook = () => {
  return useLayoutStore(store)
}
