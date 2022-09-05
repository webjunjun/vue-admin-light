<template>
  <el-header class="layout_header">
    <div class="header_left">
      <div class="logo_website" :title="defaultSetting.title">
        <!-- logo -->
        <!-- <div class="website_logo">
          <img src="/static/logo/logo.png" :alt="defaultSetting.title">
        </div> -->
        <!-- 网站名字 -->
        <div class="website_name">
          <p>{{ defaultSetting.title }}</p>
        </div>
      </div>
    </div>
    <div class="header_right">
      <!-- 登录注册 -->
      <div v-if="!isLogin" class="login_register_wrap">
        <span class="el-icon-user-solid"></span>
        <router-link to="/login">登录</router-link>
        <span>/</span>
        <router-link to="/register">注册</router-link>
      </div>
      <el-dropdown
        v-else
        class="user_drop_box"
        trigger="click"
        @command="handleCommand"
      >
        <span class="el-dropdown-link">
          <span class="el-icon-user-solid"></span>
          <span class="user_name">{{ name }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="AccountMgmt">账户管理</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { mapMutations } from 'vuex'
import { removeToken } from '@/utils/auth'
import defaultSetting from '@/utils/setting'
import variables from '@/theme/default.scss'

export default {
  name: 'LayoutHeader',
  data() {
    return {
      name: '小李'
    }
  },
  computed: {
    themeVariable() {
      return variables
    },
    defaultSetting() {
      return defaultSetting
    },
    onRoutes() {
      return this.$route.path
    },
    isLogin() {
      if (this.$store.state.token) {
        return true
      }
      return false
    }
  },
  created() {
    // 获取当前登录用户信息
  },
  methods: {
    ...mapMutations(['SET_TOKEN', 'SET_USERINFO']),
    handleLogout() {
      this.$confirm('确认退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((action) => {
        if (action === 'confirm') {
          // 手动清理所有缓存
          removeToken()
          this.SET_TOKEN(null)
          localStorage.removeItem(defaultSetting.routerKey)
          // 直接刷新页面，清理动态路由
          location.href = '/login'
        }
      })
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.handleLogout()
      } else {
        this.$router.push({
          name: command
        })
      }
    }
  }
}
</script>

<style lang="scss">
.layout_header {
  color: #fff;
  background-color: $headBg;
  line-height: 60px;
  padding: 0px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 0 15px;
  justify-content: space-between;
  .header_left,
  .header_right {
    display: flex;
  }
  .logo_website {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .website_logo {
    width: 100%;
    max-width: 150px;
    img {
      width: 100%;
      display: inherit;
    }
  }
  .website_name {
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    text-indent: 8px;
    margin-top: 8px;
    p {
      margin: 0px;
    }
  }
  .user_drop_box {
    color: $menuText;
    user-select: none;
    cursor: pointer;
    .el-icon-user-solid {
      font-size: 20px;
      vertical-align: -2px;
    }
  }
  .login_register_wrap {
    font-size: 14px;
    color: $menuText;
    cursor: pointer;
    .el-icon-user-solid {
      font-size: 20px;
      vertical-align: -2px;
    }
    a {
      color: $menuText;
      text-decoration: none;
    }
  }
}
</style>
