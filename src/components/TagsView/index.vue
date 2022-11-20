<template>
  <div class="__common-layout-pageTabs">
    <el-scrollbar>
      <div class="__tabs">
        <div
          v-for="item in openedPageRouters"
          :key="item.fullPath"
          class="__tab-item"
          :class="{
              '__is-active': item.fullPath == $route.fullPath,
          }"
          @click="onClick(item)"
          @contextmenu.prevent="showContextMenu($event, item)"
        >
          {{ item.meta.title }}
          <span
            class="el-icon-close"
            :style="openedPageRouters.length <= 1 ? 'width: 0;' : ''"
            @click.stop="onClose(item)"
            @contextmenu.prevent.stop=""
          ></span>
        </div>
      </div>
    </el-scrollbar>
    <div v-show="contextMenuVisible">
      <ul
        :style="{ left: contextMenuLeft + 'px', top: contextMenuTop + 'px' }"
        class="__contextmenu"
      >
        <li>
          <el-button
            type="text"
            size="mini"
            @click="reload"
          >刷新页面</el-button>
        </li>
        <li>
          <el-button
            type="text"
            :disabled="openedPageRouters.length > 1 ? false : true"
            size="mini"
            @click="closeOtherLeft"
          >关闭左边</el-button>
        </li>
        <li>
          <el-button
            type="text"
            :disabled="openedPageRouters.length > 1 ? false : true"
            size="mini"
            @click="closeOtherRight"
          >关闭右边</el-button>
        </li>
        <li>
          <el-button
            type="text"
            :disabled="openedPageRouters.length > 1 ? false : true"
            size="mini"
            @click="closeOther"
          >关闭其他</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagView',
  props: {
    keepAliveComponentInstance: {}, // keep-alive控件实例对象
    // 空白路由的name值
    blankRouteName: {
      type: String,
      default: () => 'RefreshBlank'
    }
  },
  data() {
    return {
      contextMenuVisible: false, // 右键菜单是否显示
      contextMenuLeft: 0, // 右键菜单显示位置
      contextMenuTop: 0, // 右键菜单显示位置
      contextMenuTargetPageRoute: null, // 右键所指向的菜单路由
      openedPageRouters: [] // 已打开的路由页面
    }
  },
  watch: {
    // 当路由变更时，执行打开页面的方法
    $route: {
      handler(v) {
        this.openPage(v)
      },
      immediate: true
    }
  },
  mounted() {
    // 添加点击关闭右键菜单
    window.addEventListener('click', this.closeContextMenu)
  },
  destroyed() {
    window.removeEventListener('click', this.closeContextMenu)
  },
  methods: {
    // 打开页面
    openPage(route) {
      if (route.name === this.blankRouteName) {
        return false
      }
      const isExist = this.openedPageRouters.some(
        (item) => item.fullPath === route.fullPath
      )
      if (!isExist) {
        const openedPageRoute = this.openedPageRouters.find(
          (item) => item.path === route.path
        )
        // 判断页面是否支持不同参数多开页面功能，如果不支持且已存在path值一样的页面路由，那就替换它
        if (!route.meta.canMultipleOpen && openedPageRoute != null) {
          this.delRouteCache(openedPageRoute.fullPath)
          this.openedPageRouters.splice(
            this.openedPageRouters.indexOf(openedPageRoute),
            1,
            route
          )
        } else {
          this.openedPageRouters.push(route)
        }
      }
    },
    // 点击页面标签卡时
    onClick(route) {
      if (route.fullPath !== this.$route.fullPath) {
        this.$router.push(route.fullPath)
      }
    },
    // 关闭页面标签时
    onClose(route) {
      const index = this.openedPageRouters.indexOf(route)
      this.delPageRoute(route)
      if (route.fullPath === this.$route.fullPath) {
        // 删除页面后，跳转到上一页面
        this.$router.replace(
          this.openedPageRouters[index === 0 ? 0 : index - 1]
        )
      }
    },
    // 右键显示菜单
    showContextMenu(e, route) {
      this.contextMenuTargetPageRoute = route
      this.contextMenuLeft = e.layerX
      this.contextMenuTop = e.layerY
      this.contextMenuVisible = true
    },
    // 隐藏右键菜单
    closeContextMenu() {
      this.contextMenuVisible = false
      this.contextMenuTargetPageRoute = null
    },
    // 重载页面
    reload() {
      if (this.contextMenuTargetPageRoute.meta.keepAlive) {
        this.delRouteCache(this.contextMenuTargetPageRoute.fullPath)
      }
      if (this.contextMenuTargetPageRoute) {
        if (this.contextMenuTargetPageRoute.fullPath === this.$route.fullPath) {
          this.$router.replace({ name: this.blankRouteName }).then(() => {
            this.$router.replace(this.contextMenuTargetPageRoute)
          })
        }
      }
    },
    // 关闭其他页面
    closeOther() {
      for (let i = 0; i < this.openedPageRouters.length; i++) {
        const r = this.openedPageRouters[i]
        if (r !== this.contextMenuTargetPageRoute) {
          this.delPageRoute(r)
          i--
        }
      }
      if (this.contextMenuTargetPageRoute.fullPath !== this.$route.fullPath) {
        this.$router.replace(this.contextMenuTargetPageRoute)
      }
    },
    // 根据路径获取索引
    getPageRouteIndex(fullPath) {
      for (let i = 0; i < this.openedPageRouters.length; i++) {
        if (this.openedPageRouters[i].fullPath === fullPath) {
          return i
        }
      }
    },
    // 关闭左边页面
    closeOtherLeft() {
      let index = this.openedPageRouters.indexOf(
        this.contextMenuTargetPageRoute
      )
      const currentIndex = this.getPageRouteIndex(this.$route.fullPath)
      if (index > currentIndex) {
        this.$router.replace(this.contextMenuTargetPageRoute)
      }
      for (let i = 0; i < index; i++) {
        const r = this.openedPageRouters[i]
        this.delPageRoute(r)
        i--
        index--
      }
    },
    // 关闭右边页面
    closeOtherRight() {
      const index = this.openedPageRouters.indexOf(
        this.contextMenuTargetPageRoute
      )
      const currentIndex = this.getPageRouteIndex(this.$route.fullPath)
      for (let i = index + 1; i < this.openedPageRouters.length; i++) {
        const r = this.openedPageRouters[i]
        this.delPageRoute(r)
        i--
      }
      if (index < currentIndex) {
        this.$router.replace(this.contextMenuTargetPageRoute)
      }
    },
    // 删除页面
    delPageRoute(route) {
      const routeIndex = this.openedPageRouters.indexOf(route)
      if (routeIndex >= 0) {
        this.openedPageRouters.splice(routeIndex, 1)
      }
      this.delRouteCache(route.fullPath)
    },
    // 删除页面缓存
    delRouteCache(key) {
      const { cache } = this.keepAliveComponentInstance
      const { keys } = this.keepAliveComponentInstance
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === key) {
          keys.splice(i, 1)
          if (cache[key] != null) {
            cache[key].componentInstance.$destroy() // 卸载缓存实例 否则可能造成内存占用过大
            delete cache[key]
          }
          break
        }
      }
    }
  }
}
</script>

<style lang="scss">
$c-tab-border-color: #dcdfe6;

.__common-layout-pageTabs {
  position: relative;

  .__contextmenu {
    position: absolute;
    z-index: 3000;
    padding: 5px 0;
    margin: 0;
    font-size: 14px;
    color: #333;
    list-style-type: none;
    background: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    box-shadow: 1px 1px 3px 0 rgb(0 0 0 / 10%);

    li {
      padding: 0 15px;
      margin: 0;

      &:hover {
        cursor: pointer;
        background: #f2f2f2;
      }

      button {
        color: #2c3e50;
      }

      .is-disabled {
        color: #c0c4cc;
      }
    }
  }

  &::before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    border-bottom: 1px solid $c-tab-border-color;
    content: "";
  }

  .__tabs {
    display: flex;

    .__tab-item {
      padding: 8px 6px 8px 18px;
      font-size: 12px;
      line-height: 14px;
      white-space: nowrap;
      cursor: pointer;
      border: 1px solid $c-tab-border-color;
      border-bottom: 0;
      border-left: none;
      transition: color .3s cubic-bezier(.645, .045, .355, 1), padding .3s cubic-bezier(.645, .045, .355, 1);

      &:first-child {
        border-left: 1px solid $c-tab-border-color;
        border-top-left-radius: 2px;
      }

      &:last-child {
        border-top-right-radius: 2px;
      }

      &:not(.__is-active):hover {
        color: #409eff;

        .el-icon-close {
          width: 12px;
          margin-right: 0;
        }
      }

      &.__is-active {
        padding-right: 12px;
        color: #409eff;
        border-bottom: 1px solid #fff;

        .el-icon-close {
          width: 12px;
          margin-right: 0;
          margin-left: 2px;
        }
      }

      .el-icon-close {
        width: 0;
        height: 12px;
        margin-right: 12px;
        overflow: hidden;
        font-size: 12px;
        vertical-align: text-top;
        border-radius: 50%;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;

        &:hover {
          color: #fff;
          background-color: #c0c4cc;
        }
      }
    }
  }
}
</style>
