<template>
  <el-header class="layout-header">
    <div class="header-left">
      <div class="logo-website" :title="defaultSetting.title">
        <!-- logo -->
        <!-- <div class="website-logo">
          <img src="/static/logo/logo.png" :alt="defaultSetting.title">
        </div> -->
        <!-- 网站名字 -->
        <div class="website-name">
          <p>{{ defaultSetting.title }}</p>
        </div>
      </div>
    </div>
    <div class="header-right">
      <!-- 登录注册 -->
      <div v-if="!isLogin" class="login-register-wrap">
        <span class="el-icon-user-solid"></span>
        <router-link to="/login">登录</router-link>
        <span>/</span>
        <router-link to="/register">注册</router-link>
      </div>
      <el-dropdown
        v-else
        class="user-drop-box"
        trigger="click"
        @command="handleCommand"
      >
        <span class="el-dropdown-link">
          <span class="el-icon-user-solid"></span>
          <span class="user-name">{{ name }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="AccountMine">账户管理</el-dropdown-item>
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
import variables from '@/theme/default.module.scss'

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
.layout-header {
  display: flex;
  width: 100%;
  padding: 0 15px;
  line-height: 60px;
  color: #fff;
  background-color: $headBg;
  box-sizing: border-box;
  justify-content: space-between;

  .header-left,
  .header-right {
    display: flex;
  }

  .logo-website {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .website-logo {
    width: 100%;
    max-width: 150px;

    img {
      display: inherit;
      width: 100%;
    }
  }

  .website-name {
    margin-top: 8px;
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    text-indent: 8px;

    p {
      margin: 0;
    }
  }

  .user-drop-box {
    color: $menuText;
    cursor: pointer;
    user-select: none;

    .el-icon-user-solid {
      font-size: 20px;
      vertical-align: -2px;
    }
  }

  .login-register-wrap {
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
