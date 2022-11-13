<template>
  <div class="login_page">
    <el-form class="login_form" ref="form" :model="form" :rules="rules">
      <div class="title-container">{{ defaultSetting.title }}</div>
      <el-form-item class="login-input" prop="name">
        <svg-icon class="iconfont" icon-class="user" />
        <el-input
          placeholder="请输入用户名"
          v-model.trim="form.name"
          maxlength="30"
          @keyup.enter.native="handleLogin"
        ></el-input>
      </el-form-item>
      <el-form-item class="login-input remeber-forget" prop="passwd">
        <svg-icon class="iconfont" icon-class="lock" />
        <el-input
          placeholder="请输入密码"
          :type="isShowPwd ? 'text' : 'password'"
          v-model.trim="form.passwd"
          maxlength="30"
          @keyup.enter.native="handleLogin"
        ></el-input>
        <svg-icon class="control-pwd" :icon-class="isShowPwd ? 'eye' : 'eyeoff'" @click="handleShowPwd" />
      </el-form-item>
      <el-form-item class="remeber-forget">
        <el-checkbox v-model="form.remember">记住密码</el-checkbox>
        <router-link class="forget-pwd" to="/login">忘记密码</router-link>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="handleLogin"
          :loading="loading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import defaultSetting from '@/utils/setting'

export default {
  name: 'Login',
  data() {
    return {
      isShowPwd: false,
      form: {
        name: '',
        passwd: '',
        remember: false
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        passwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
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
    ...mapActions(['userLogin']),
    handleLogin() {
      if (this.loading) {
        this.$message({
          message: '正在登录中，请勿重复触发',
          type: 'warning',
          duration: 3000
        })
        return false
      }
      let msg = ''
      let isAlert = false
      if (this.form.name === '') {
        msg = '登录账号不能为空'
        isAlert = true
      }
      if (!isAlert && this.form.password === '') {
        msg = '密码不能为空'
        isAlert = true
      }
      if (isAlert) {
        this.$message({
          message: msg,
          type: 'warning'
        })
        return false
      }
      this.loading = true
      // this.$store.dispatch('userLogin', this.form)
      this.userLogin(this.form)
        .then((res) => {
          let msgType = 'success'
          if (res.code !== 0) {
            msgType = 'warning'
          }
          this.$message({
            message: res.msg,
            type: msgType,
            duration: msgType === 'success' ? 1000 : 2000,
            onClose: () => {
              if (res.code === 0) {
                if (this.$route.query.redirect) {
                  this.$router.replace({
                    path: this.$route.query.redirect
                  })
                } else {
                  this.$router
                    .replace({
                      name: 'DashboardAnalysis'
                    })
                    .catch(() => {
                      // 首次登陆会抛异常，需要接受这个
                    })
                }
              } else {
                this.loading = false
              }
            }
          })
        })
        .catch((err) => {
          this.loading = false
        })
    },
    handleShowPwd() {
      this.isShowPwd = !this.isShowPwd
    }
  }
}
</script>

<style lang="scss">
$loginWhite: #fff;

login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  background-color: $blue;

  .title-container {
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: 600;
    color: $loginWhite;
    text-align: center;
  }

  .el-input {
    width: 300px;
    height: 47px;

    .el-input__inner {
      width: 100%;
      height: 47px;
      padding: 12px 5px 12px 15px;
      color: $loginWhite;
      background: transparent;
      border: 0;
      border-radius: 0;
      appearance: none;
    }
  }

  .login-input {
    padding-left: 12px;
    background: rgb(0 0 0 / 10%);
    box-sizing: border-box;

    .iconfont {
      color: $light-blue;
    }
  }

  .remeber-forget {
    margin-bottom: 10px;

    .el-checkbox__label {
      color: $loginWhite;
    }
  }

  .forget-pwd {
    float: right;
    color: $loginWhite;
    text-decoration: none;

    &:hover {
      color: $light-blue;
    }
  }

  .control-pwd {
    display: inline-block;
    height: 47px;
    padding-right: 12px;
    color: $light-blue;
    cursor: pointer;
  }

  .login-btn {
    width: 100%;
  }
}
</style>
