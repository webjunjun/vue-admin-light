<template>
  <div class="login_page">
    <el-form class="login_form" ref="form" :model="form" :rules="rules">
      <div class="title-container">{{ defaultSetting.title }}</div>
      <el-form-item class="login_input" prop="name">
        <span class="iconfont iconicontouxiang"></span>
        <el-input
          placeholder="请输入用户名"
          v-model.trim="form.name"
          maxlength="30"
          @keyup.enter.native="handleLogin"
        ></el-input>
      </el-form-item>
      <el-form-item class="login_input remeber_forget" prop="passwd">
        <span class="iconfont iconsuo"></span>
        <el-input
          placeholder="请输入密码"
          :type="isShowPwd ? 'text' : 'password'"
          v-model.trim="form.passwd"
          maxlength="30"
          @keyup.enter.native="handleLogin"
        ></el-input>
        <span
          class="control_pwd iconfont"
          :class="isShowPwd ? 'iconyanjing' : 'iconbiyan'"
          @click="handleShowPwd"
        ></span>
      </el-form-item>
      <el-form-item class="remeber_forget">
        <el-checkbox v-model="form.remember">记住密码</el-checkbox>
        <router-link class="forget_pwd" to="/login">忘记密码</router-link>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login_btn"
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
            onClose: () => {
              if (res.code === 0) {
                if (this.$route.query.redirect) {
                  this.$router.replace({
                    path: this.$route.query.redirect
                  })
                } else {
                  this.$router
                    .replace({
                      name: 'AdminIndex'
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
.login_page {
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $blue;
  .title-container {
    font-size: 24px;
    color: $loginWhite;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
  }
  .el-input {
    width: 300px;
    height: 47px;
    .el-input__inner {
      width: 100%;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $loginWhite;
      height: 47px;
      -webkit-appearance: none;
    }
  }
  .login_input {
    box-sizing: border-box;
    padding-left: 12px;
    background: rgba(0, 0, 0, 0.1);
    .iconfont {
      color: $light-blue;
    }
  }
  .remeber_forget {
    margin-bottom: 10px;
    .el-checkbox__label {
      color: $loginWhite;
    }
  }
  .forget_pwd {
    float: right;
    color: $loginWhite;
    text-decoration: none;
    &:hover {
      color: $light-blue;
    }
  }
  .control_pwd {
    display: inline-block;
    height: 47px;
    cursor: pointer;
    padding-right: 12px;
  }
  .login_btn {
    width: 100%;
  }
}
</style>
