<template>
    <div class="front-bottom">
        <div class="footer_inner">
            <el-row>
                <el-col v-for="(item, index) in listArr" :key="index" :span="6" :md="6" :sm="6" :xs="24">
                    <div class="list_content">
                        <ul>
                            <li class="list_title">
                                <h3>{{item.title}}</h3>
                            </li>
                            <li v-for="(ite, idx) in item.children" :key="index + idx" class="list_item">
                                <a :href="ite.link">{{ite.name}}</a>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FrontBottom',
    data() {
        return {
            listArr: [{
                title: '首页',
                children: [{
                    link: 'javascript:;',
                    name: '首页'
                }, {
                    link: 'javascript:;',
                    name: '公司简介'
                }]
            }, {
                title: '功能模块',
                children: [{
                    link: 'javascript:;',
                    name: '数据采集模块'
                }, {
                    link: 'javascript:;',
                    name: '任务调度模块'
                }, {
                    link: 'javascript:;',
                    name: '元数据管理'
                }, {
                    link: 'javascript:;',
                    name: '数据服务模块'
                }]
            }, {
                title: '业务应用',
                children: [{
                    link: 'javascript:;',
                    name: '服务运营赋能'
                }, {
                    link: 'javascript:;',
                    name: '通信能力赋能'
                }, {
                    link: 'javascript:;',
                    name: '行业洞察报告'
                }, {
                    link: 'javascript:;',
                    name: '用户画像报告'
                }, {
                    link: 'javascript:;',
                    name: 'DashBoard'
                }]
            }, {
                title: '关于我们',
                children: [{
                    link: 'javascript:;',
                    name: '合作伙伴'
                }, {
                    link: 'javascript:;',
                    name: '联系我们'
                }]
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
.front-bottom{
    width: 100%;
    background-color: #0e1433;
    padding: 40px 0px 70px;
}
.footer_inner{
    max-width: 1080px;
    margin: 0 auto;
    .list_content{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    li{
        list-style: none;
        font-size: 14px;
        color: #fff;
        text-align: left;
        line-height: 1em;
    }
    h3{
        margin: 0px;
        margin-bottom: 30px;
    }
    a{
        color: #fff;
        text-decoration: none;
    }
    .list_item{
        line-height: 1.75em;
    }
}
</style>
