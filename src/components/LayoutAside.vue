<template>
    <el-aside class="sidebar" :width="leftWidth">
        <!-- 侧栏菜单 -->
        <el-menu
            :default-active="onRoutes"
			:router="true"
            class="el-menu-vertical-demo"
            :background-color="themeVariable.menuBg"
            :text-color="themeVariable.menuText"
            :active-text-color="themeVariable.menuActiveText"
            :collapse="isCollapse">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-s-platform"></i>
                    <span>工作台</span>
                </template>
                <el-menu-item index="/work_platform/rsrc_mgmt">资源管理</el-menu-item>
                <el-menu-item index="/work_platform/apikey_mgmt">API KEY 管理</el-menu-item>
                <el-menu-item index="/work_platform/api_statistics">API统计</el-menu-item>
                <el-menu-item index="/work_platform/task_mgmt">任务管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-s-tools"></i>
                    <span>系统管理</span>
                </template>
                <el-menu-item index="/system/account_mgmt">账户管理</el-menu-item>
                <el-menu-item index="/system/role_mgmt" disabled>角色管理</el-menu-item>
            </el-submenu>
            <li class="space_box"></li>
        </el-menu>
        <div class="collapse_btn" :style="'width:' + leftWidth" @click="handleCollapse">
            <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </div>
    </el-aside>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import variables from '@/theme/default.scss'
export default {
    name: 'LayoutAside',
    data() {
        return {
            isCollapse: false, //是否折叠
            list: [], //菜单数据源
        }
    },
    computed: {
        ...mapGetters(['permission_routes', 'leftWidth']),
        themeVariable() {
            return variables
        },
        onRoutes() {
            return this.$route.path
        }
    },
    methods: {
        ...mapMutations(['SET_LEFTWIDTH']),
        handleCollapse() {
            this.isCollapse = !this.isCollapse
            if (this.isCollapse) {
                this.SET_LEFTWIDTH('64px')
            } else {
                this.SET_LEFTWIDTH('200px')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.sidebar {
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0px;
    overflow-y: scroll;
    box-sizing: border-box;
    transition: all .3s ease;
    background-color: $blue;
}
.sidebar::-webkit-scrollbar{
    width: 0;
}
.sidebar > ul {
    height: 100%;
    border-right: none;
    transition: all .3s ease;
}
.space_box{
    width: 100%;
    height: 40px;
    background-color: $blue;
}
.collapse_btn{
    position: fixed;
    left: 0px;
    bottom: 0px;
    height: 40px;
    background-color: $light-blue;
    text-align: center;
    transition: all .3s ease;
    cursor: pointer;
    i{
        font-size: 24px;
        line-height: 40px;
        color: #fff;
    }
}
</style>
