<template>
  <div class="login-main">
    <div class="login-box">
      <h1 class="login-title">element后台管理系统</h1>
      <el-form ref="ruleFormRef" class="login-form" :rules="rules" :model="ruleForm">
        <el-form-item label="" prop="username">
          <el-input
            v-model.trim="ruleForm.username"
            class="login-input"
            type="text"
            autocomplete="off"
            :placeholder="t('verifyUserName')"
            clearable
          />
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            v-model.trim="ruleForm.password"
            class="login-input"
            type="password"
            autocomplete="off"
            :placeholder="t('verifyPassword')"
            clearable
          />
        </el-form-item>
        <el-form-item class="login-bottom">
          <el-button class="login-submit" type="primary" @click="submitForm(ruleFormRef)">{{ t('login') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup name="LoginView">
import { reactive, ref } from 'vue'
import useI18NPrefix from '@/hooks/useI18NPrefix'
import type { LoginForm } from './types/login.type'
import type { FormInstance, FormRules } from 'element-plus'

const t = useI18NPrefix('loginPage')

// 声明一个与子组件里的ref同名的变量，才能访问子组件实例
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<LoginForm>({
  username: '',
  password: ''
})
const rules = reactive<FormRules>({
  username: [{ required: true, message: t('verifyUserName'), trigger: 'blur' }],
  password: [{ required: true, message: t('verifyPassword'), trigger: 'blur' }]
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="scss" scoped>
.login-main {
  width: 100%;
  min-height: 100vh;
  background-color: $blue;
  display: flex;
  justify-content: center;

  .login-box {
    margin-top: 100px;
    width: 400px;

    .login-form {
      width: 100%;
      padding: 30px 20px;
      box-sizing: border-box;
      border-radius: 6px;
      background-color: #fff;
      margin-top: 30px;
    }
  }

  .login-title {
    font-size: 30px;
    color: #fff;
    text-align: center;
  }

  .login-input {
    height: 40px;
  }

  .login-bottom {
    margin-bottom: 0px;
  }

  .login-submit {
    width: 100%;
    height: 40px;
  }
}
</style>
