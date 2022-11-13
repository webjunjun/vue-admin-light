import Vue from 'vue'
import store from '@/store/index'

function checkPermission(el, binding) {
  const { value } = binding
  if (value) {
    const permissionBtns = store.state.permissionBtns || []
    const hasPermission = function hasPermission() {
      return permissionBtns.includes(value)
    }
    if (store.state.btnAuthOn) {
      if (permissionBtns.length > 0 && !hasPermission()) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error('请设置按钮的操作权限')
  }
}

Vue.directive('permission', {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
})
