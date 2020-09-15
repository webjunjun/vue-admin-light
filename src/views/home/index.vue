<template>
    <div class="home_index">
        <layout-header></layout-header>
        <el-carousel trigger="click" height="420px" :interval="6000" indicator-position="none">
            <el-carousel-item v-for="(item, index) in bannerArr" :key="index">
                <div class="banner_wrap" style="background: url('/static/home/banner01.png') top right no-repeat;background-size: contain;">
                    <div class="banner_item">
                        <h3>{{item.title}}</h3>
                        <p>{{item.desc}}</p>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
        <div class="menu_center_list">
            <el-row class="menu_ceter_wrap">
                <el-col v-for="(item, index) in menuList" :key="index" :span="8">
                    <div class="menu_item">
                        <div class="menu_img">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="menu_info">
                            <h3 class="menu_title">{{item.title}}</h3>
                            <p class="menu_paga">
                                <span class="menu_num_unit">{{item.num}}</span>
                                <span class="menu_num_unit">{{item.unit}}</span>
                                <span class="menu_ps">{{item.ps}}</span>
                            </p>
                            <span class="menu_border"></span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="power_wrap">
            <el-row>
                <el-col>
                    <h3>我们的能力</h3>
                </el-col>
            </el-row>
            <el-row>
                <el-col v-for="(item, index) in powerArr" :key="index" :span="8" :md="8" :sm="12" :xs="24">
                    <div class="power_item">
                        <div class="power_img">
                            <img class="" :src="item.img" />
                        </div>
                        <div class="power_right">
                            <div class="power_right_inner">
                                <p class="power_num">{{item.num}}</p>
                                <p class="power_desc">{{item.desc}}</p>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <front-bottom></front-bottom>
    </div>
</template>

<script>
import LayoutHeader from '@/components/LayoutHeader'
import FrontBottom from '@/components/FrontBottom'
export default {
    name: 'home_index',
    components: {
        LayoutHeader,
        FrontBottom
    },
    data() {
        return {
            bannerArr: [{
                title: '实时数据在线流数据服务',
                desc: '开放平台接口，实时访问数据，快速数据对接，敏捷数据调用，迅速响应'
            }],
            powerArr: [{
                img: '/static/home/01.png',
                num: 213,
                desc: '接入指数'
            }, {
                img: '/static/home/02.png',
                num: 31213213,
                desc: '数据服务'
            }, {
                img: '/static/home/03.png',
                num: 31213213,
                desc: '接口试用次数'
            }, {
                img: '/static/home/04.png',
                num: 31213213,
                desc: '当日使用次数'
            },{
                img: '/static/home/05.png',
                num: 31213213,
                desc: '热点数据次数'
            }, {
                img: '/static/home/06.png',
                num: 31213213,
                desc: '最新注册数据服务'
            }],
            menuList: [{
                img: '/static/home/07.png',
                title: 'API调用量',
                num: 212.68,
                unit: '亿',
                ps: '次+'
            }, {
                img: '/static/home/08.png',
                title: '文件数据推送条数',
                num: 46.79,
                unit: '亿',
                ps: '条+'
            }, {
                img: '/static/home/09.png',
                title: '流服务数据流量',
                num: 0.00,
                unit: '亿',
                ps: ''
            }]
        }
    }
}
</script>

<style lang="scss">
.home_index .el-carousel{
    width: 100%;
    background-color: #0f1338;
}
.el-carousel__container{
    max-width: 1080px;
    margin: 0 auto;
}
</style>

<style lang="scss" scoped>
.el-carousel__item{
    width: 100%;
    box-sizing: border-box;
    padding-top: 40px;
    user-select: none;
    cursor: pointer;
}
.banner_wrap{
    max-width: 850px;
    height: 240px;
    margin: 0 auto;
    box-sizing: border-box;
    .banner_item{
        max-width: 360px;
        font-size: 20px;
        color: #fff;
        text-align: center;
        line-height: 1em;
        padding-top: 50px;
        p{
            font-size: 14px;
        }
    }
}
.menu_center_list{
    position: relative;
    max-width: 600px;
    padding: 16px 0px;
    background-color: #11162e;
    font-size: 14px;
    color: #fff;
    border: 1px solid rgba(18, 61, 100, .5);
    margin: -114px auto 0px;
    .el-col{
        &::nth-child(2n) {
            border-left: 1px solid #494a54;
            border-right: 1px solid #494a54;
        }
    }
    p,h3{
        margin: 0px;
        line-height: 1em;
    }
    .menu_item{
        display: flex;
        width: 200px;
        justify-content: center;
        align-items: center;
        h3{
            font-size: 12px;
            margin-bottom: 20px;
        }
        .menu_paga{
            font-size: 0px;
        }
        .menu_num_unit{
            font-size: 20px;
        }
        .menu_ps{
            display: inline-block;
            font-size: 12px;
            transform: scale(.8);
        }
    }
    .menu_border{
        display: block;
        width: 20px;
        height: 2px;
        background-color: #494a54;
        margin-top: 20px;
    }
    .menu_img{
        width: 40px;
        height: 40px;
        border-radius: 100%;
        border: 1px solid #c9c9c9;
        box-sizing: border-box;
        padding: 10px;
        margin-right: 20px;
        img{
            width: 100%;
        }
    }
}
.power_wrap{
    max-width: 1080px;
    margin: 0 auto;
    h3{
        font-size: 24px;
        text-align: center;
        margin: 40px 0px;
    }
}
.power_item{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    .power_img{
        width: 70px;
        height: 70px;
        background-color: #409ee5;
        border-radius: 100%;
        box-sizing: border-box;
        padding: 10px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .power_right{
        width: 130px;
        margin-left: 20px;
        text-align: left;
        line-height: 1.25em;
        .power_right_inner{
            display: inline-block;
            font-size: 16px;
            font-weight: 600;
            text-align: center;
        }
        .power_num{
            color: #333;
            margin: 0px;
        }
        .power_desc{
            color: #409ee5;
            margin: 0px;
        }
    }
}
</style>