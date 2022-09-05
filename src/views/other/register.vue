<template>
  <div class="register_page">
    <el-form
      class="register_form"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="right"
    >
      <div class="title-container">
        {{ defaultSetting.title }}<span> 账号注册</span>
      </div>
      <el-form-item label="用户名" prop="name">
        <el-input
          v-model.trim="form.name"
          placeholder="请输入用户名"
          maxlength="30"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passwd">
        <el-input
          v-model.trim="form.passwd"
          type="password"
          placeholder="请输入密码"
          maxlength="30"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="review_pwd">
        <el-input
          v-model.trim="form.review_pwd"
          type="password"
          placeholder="请输入确认密码"
          maxlength="30"
        ></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input
          v-model.trim="form.nickname"
          placeholder="请输入昵称"
          maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model.trim="form.email"
          placeholder="请输入邮箱"
          maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model.trim="form.phone"
          placeholder="请输入手机号"
          maxlength="11"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input
          v-model.trim="form.company"
          placeholder="请输入公司名称"
          maxlength="30"
        ></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input
          v-model.trim="form.title"
          placeholder="请输入职位"
          maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="register_btn"
          type="primary"
          size="small"
          :loading="loading"
          @click="handleRegister"
          >注册</el-button
        >
        <el-button class="cancel_btn" size="small" @click="handleCancel"
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import defaultSetting from '@/utils/setting'
import { checkCellphone, checkMail } from '@/utils/utils'
import { register } from '@/api/user'

export default {
  name: 'Register',
  data() {
    return {
      form: {
        name: '',
        passwd: '',
        review_pwd: '',
        nickname: '',
        email: '',
        phone: '',
        company: '',
        title: ''
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        passwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        review_pwd: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  computed: {
    defaultSetting() {
      return defaultSetting
    }
  },
  methods: {
    handleRegister() {
      if (this.loading) {
        this.$message({
          message: '正在注册中，请勿重复触发',
          type: 'warning',
          duration: 3000
        })
        return false
      }
      let msg = ''
      let isAlert = false
      if (this.form.name === '') {
        msg = '用户名不能为空'
        isAlert = true
      }
      if (!isAlert && this.form.passwd === '') {
        msg = '密码不能为空'
        isAlert = true
      }
      if (!isAlert && this.form.review_pwd === '') {
        msg = '确认密码不能为空'
        isAlert = true
      }
      if (!isAlert && this.form.review_pwd !== this.form.passwd) {
        msg = '两次密码不一致'
        isAlert = true
      }
      if (!isAlert && this.form.nickname === '') {
        msg = '昵称不能为空'
        isAlert = true
      }
      if (!isAlert && this.form.email === '') {
        msg = '邮箱不能为空'
        isAlert = true
      }
      if (!isAlert && !checkMail(this.form.email)) {
        msg = '邮箱格式错误'
        isAlert = true
      }
      if (!isAlert && this.form.phone === '') {
        msg = '手机号不能为空'
        isAlert = true
      }
      if (!isAlert && !checkCellphone(this.form.phone)) {
        msg = '手机号格式错误'
        isAlert = true
      }
      if (isAlert) {
        this.$message({
          message: msg,
          type: 'warning',
          duration: 3000
        })
        return false
      }
      this.loading = true
      register(this.form)
        .then((res) => {
          const json = res
          if (json.data) {
            this.$alert(
              '恭喜您注册成功，审核通过后您可登录系统。请您理解。',
              '提示',
              {
                confirmButtonText: '确定',
                callback: (action) => {
                  this.loading = false
                }
              }
            )
          } else {
            this.$message({
              message: json.msg,
              type: 'warning'
            })
            this.loading = false
          }
        })
        .catch((res) => {
          this.loading = false
        })
    },
    handleCancel() {
      this.$router.replace({
        name: 'Login'
      })
    }
  }
}
</script>

<style lang="scss">
$loginWhite: #fff;
.register_page {
  width: 100%;
  min-height: 100%;
  background-color: $blue;
  box-sizing: border-box;
  padding: 80px 0px;
  .title-container {
    font-size: 24px;
    color: #fff;
    font-weight: 600;
    text-align: left;
    margin-bottom: 30px;
    span {
      font-size: 14px;
    }
  }
  .register_form {
    max-width: 500px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 30px;
    .el-input {
      max-width: 300px;
      .el-input__inner {
        width: 100%;
        background: rgba(0, 0, 0, 0.1);
        border: 0px;
        border-radius: 0px;
        color: $loginWhite;
        -webkit-appearance: none;
      }
    }
    .el-form-item__label {
      color: $loginWhite;
    }
  }
}
</style>
