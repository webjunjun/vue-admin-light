<template>
    <div class="filter-goods">
        <div ref="proChoose" class="l_pro_choose">
            <div class="l_filter_group_wrap">
                <div class="l_filter_group clearfix" v-if="chooseList.length > 0">
                    <h3 class="l_filter_group_title">已选</h3>
                    <div class="l_selected_content clearfix">
                        <div class="l_filter_group_content select_content">
                            <el-tooltip v-for="(chooseItem, cIdx) in chooseList" :key="cIdx" effect="dark" :content="chooseItem.children.join(',')" placement="top">
                                <div class="breadcrumbs_cell">
                                    <div class="breadcrumbs_cell_title">
                                        {{chooseItem.type}}：<span>{{chooseItem.children.join(',')}}</span>
                                    </div>
                                    <a class="l_filter_selected_close" href="javascript:;" @click="clearSelf(cIdx)">
                                        <i class="el-icon-close"></i>
                                    </a>
                                </div>
                            </el-tooltip>
                        </div>
                    </div>
                    <div class="l_delete_selected" @click="clearSelected">清空已选条件</div>
                </div>
                <div class="l_filter_group clearfix" v-for="(goodsItem, gIdx) in goodsList" :key="gIdx">
                    <h3 class="l_filter_group_title">{{goodsItem.type}}</h3>
                    <div class="l_filter_group_content l_filter_group_options">
                        <div class="l_filter_group_scroll" :class="goodsItem.isExpand ? 'l_expand' : ''">
                            <ul class="l_filter_data_list" :class="goodsItem.isMulti ? 'l_check_list' : ''">
                                <li v-for="(gItem, snIdx) in goodsItem.data" :key="gIdx + snIdx" class="l_filter_data_item" :class="gItem.isCheck ? 'l_check_item' : ''" @click="handleCategory(gIdx, snIdx)">
                                    <a href="javascript:;" class="l_filter_category_link">{{gItem.name}}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="l_filter_group_commands" v-if="goodsItem.isMulti">
                            <el-button size="mini" type="primary" @click="confirmMulti(gIdx)">确认</el-button>
                            <el-button size="mini" @click="handleCancelMulti(gIdx)">取消</el-button>
                        </div>
                        <div class="l_filter_group_operation">
                            <template v-if="!goodsItem.isMulti">
                                <span class="l_group_expand_collapse" v-if="!goodsItem.isExpand" @click="handleExpand(gIdx)">更多<i class="el-icon-arrow-down"></i></span>
                                <span class="l_group_expand_collapse" v-else @click="handleExpand(gIdx)">收起<i class="el-icon-arrow-up"></i></span>
                            </template>
                            <span class="l_filter_group_multiple" v-if="!goodsItem.isMulti" @click="handleMulti(gIdx)"><i class="el-icon-plus"></i>多选</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="l_choose_commands" v-if="goodsList.length > 4">
                <div v-if="!isGoodsCollapse" class="l_choose_command_button">
                    <span>
                        <i class="el-icon-arrow-down"></i>
                        更多选项
                    </span>
                </div>
                <div v-else class="l_choose_command_button">
                    <span>
                        <i class="el-icon-arrow-up"></i>
                        点击收起
                    </span>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'FilterGoods',
    data() {
        return {
            goodsList: [{
                type: '表单类型',
                isMulti: false,
                isExpand: false,
                data: [{
                    id: 1,
                    name: '用户表',
                    isCheck: false
                }, {
                    id: 2,
                    name: '订单表',
                    isCheck: false
                }, {
                    id: 3,
                    name: '流量表',
                    isCheck: false
                }, {
                    id: 4,
                    name: '经营表',
                    isCheck: false
                }, {
                    id: 5,
                    name: '运营用户表',
                    isCheck: false
                }]
            }, {
                type: '时间类型',
                isMulti: false,
                isExpand: false,
                data: [{
                    id: 1,
                    name: '月表',
                    isCheck: false
                }, {
                    id: 2,
                    name: '月维度客户表',
                    isCheck: false
                }, {
                    id: 3,
                    name: '月维度项目表',
                    isCheck: false
                }, {
                    id: 4,
                    name: '日表',
                    isCheck: false
                }, {
                    id: 5,
                    name: '日维度客户表',
                    isCheck: false
                }, {
                    id: 6,
                    name: '日维度项目表',
                    isCheck: false
                }]
            }, {
                type: '订单类型',
                isMulti: false,
                isExpand: false,
                data: [{
                    id: 1,
                    name: '支付成功',
                    isCheck: false
                }, {
                    id: 2,
                    name: '支付失败',
                    isCheck: false
                }, {
                    id: 3,
                    name: '免费',
                    isCheck: false
                }, {
                    id: 4,
                    name: '付费退款',
                    isCheck: false
                }, {
                    id: 5,
                    name: '付费',
                    isCheck: false
                }]
            }],
            isGoodsCollapse: false,
            chooseList: [],
        }
    },
    methods: {
        clearSelected() {
            // 清空已选
            this.chooseList = []
        },
        clearSelf(val) {
            // 删除自己
            this.chooseList.splice(val, 1)
        },
        handleCategory(curParIdx, curIdx) {
            // curParIdx: 当前行行数，curIdx: 点击的第几个
            const parentData = this.goodsList[curParIdx]
            if (parentData.isMulti) {
                // 开启了多选，修改是否选中标识
                parentData.data[curIdx].isCheck = !parentData.data[curIdx].isCheck
            } else {
                // 关闭了多选，数据替换
                const tempChooseArr =  this.chooseList.filter((item, index) => {
                    if (item.type !== parentData.type) {
                        return item
                    }
                })
                this.chooseList = tempChooseArr
                this.chooseList.push({
                    type: parentData.type,
                    children: [parentData.data[curIdx].name],
                    idsArr: [parentData.data[curIdx].id]
                })
            }
        },
        handleMulti(val) {
            // 对匹配的商品添加选中标识
            const chooseData = this.chooseList
            if (chooseData.length > 0) {
                const goodsData = this.goodsList[val]
                let curIndex = null
                for (let i = 0; i < chooseData.length; i++) {
                    if (chooseData[i].type === goodsData.type) {
                        curIndex = i
                        break;
                    }
                }
                if (curIndex !== null) {
                    const tempIdsArr = chooseData[curIndex].idsArr
                    for (let j = 0; j < goodsData.data.length; j++) {
                        const curId = goodsData.data[j].id
                        if (tempIdsArr.indexOf(curId) !== -1) {
                            goodsData.data[j].isCheck = true
                        }
                    }
                }
            }
            this.goodsList[val].isMulti = true
            this.goodsList[val].isExpand = true
        },
        handleCancelMulti(val) {
            // 对商品移除选中标识
            const goodsData = this.goodsList[val]
            for (let i = 0; i < goodsData.data.length; i++) {
                goodsData.data[i].isCheck = false
            }
            goodsData.isMulti = false
            goodsData.isExpand = false
        },
        confirmMulti(val) {
            // 多选确定，将所有选中的塞进去
            const chooseData = this.chooseList
            const goodsData = this.goodsList[val]
            let curIndex = null
            for (let i = 0; i < chooseData.length; i++) {
                if (chooseData[i].type === goodsData.type) {
                    curIndex = i
                    break;
                }
            }
            let tempData = {
                type: goodsData.type,
                children: [],
                idsArr: []
            }
            for (let j = 0; j < goodsData.data.length; j++) {
                if (goodsData.data[j].isCheck) {
                    tempData.children.push(goodsData.data[j].name)
                    tempData.idsArr.push(goodsData.data[j].id)
                }
            }
            if (tempData.idsArr.length <= 0) {
                // 说明去掉了这一行全部选中
                this.clearSelf(curIndex)
            } else {
                // 替换这一行全部选中
                if (curIndex !== null) {
                    chooseData[curIndex] = tempData
                } else {
                    chooseData.push(tempData)
                }
            }
            this.handleCancelMulti(val)
        },
        handleExpand(val) {
            this.goodsList[val].isExpand = !this.goodsList[val].isExpand
        }
    }
}
</script>

<style lang="scss" scoped>
.l_filter_group_wrap{
    width: 100%;
    border: 1px solid #ddd;
    border-bottom: none;
    font-size: 12px;
    .l_filter_group{
        border-bottom: 1px solid #ddd;
        position: relative;
        z-index: 1;
        zoom: 1;
        .l_filter_group_title{
            float: left;
            font-weight: 400;
            color: #666;
            padding-left: 10px;
            width: 100px;
        }
        .l_selected_content{
            float: left;
            width: calc(100% - 220px);
            margin-top: 10px;
        }
        .l_delete_selected{
            float: right;
            margin: 10px 0;
            width: 96px;
            text-align: center;
            line-height: 22px;
            height: 23px;
            background-color: #fff;
            border-radius: 2px;
            border: solid 1px #d1d1d1;
            margin-right: 10px;
            cursor: pointer;
        }
        .select_content{
            display: flex;
            flex-wrap: wrap;
        }
        .l_filter_group_content{
            float: left;
            .breadcrumbs_cell{
                max-width: 200px;
                overflow: hidden;
                padding-left: 10px;
                margin-right: 14px;
                vertical-align: top;
                line-height: 24px;
                border: 1px solid #ddd;
                border-radius: 4px;
                box-sizing: border-box;
                margin-bottom: 10px;
                .breadcrumbs_cell_title{
                    max-width: 152px;
                    display: inline-block;
                    padding-right: 8px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    vertical-align: top;
                }
                .l_filter_selected_close{
                    display: inline-block;
                    padding-left: 6px;
                    padding-right: 6px;
                    line-height: 24px;
                    color: #fff;
                    text-align: center;
                    background-color: #f56c6c;
                }
            }
        }
        .l_filter_group_multiple{
            width: 48px;
            line-height: 20px;
            text-align: center;
            background-color: #fff;
            color: #666;
            border: 1px solid #d1d1d1;
            border-radius: 4px;
            padding: 0 4px;
            cursor: pointer;
        }
        .l_group_expand_collapse{
            width: 48px;
            color: #666;
            line-height: 22px;
            cursor: pointer;
            margin-right: 6px;
        }
    }
}
.l_filter_data_list{
    list-style-type: none;
    margin: 0px;
    padding: 0px;
    a{
        font-size: 12px;
        color: #333;
        line-height: 16px;
        text-decoration: none;
        position: relative;
        &:hover{
            color: #f10180;
        }
    }
    .l_filter_data_item{
        display: inline-block;
        margin-right: 20px;
        margin-bottom: 10px;
    }
}
.l_filter_group_options{
    width: calc(100% - 220px);
    padding-top: 16px;
    padding-bottom: 16px;
    .l_filter_group_scroll{
        max-height: 16px;
        overflow: hidden;
    }
    .l_expand{
        max-height: 100px;
        overflow-y: auto;
    }
    .l_filter_group_commands{
        text-align: center;
        padding-top: 10px;
        padding-bottom: 12px;
    }
}
.l_filter_group_operation{
    position: absolute;
    top: 12px;
    right: 12px;
}
.l_check_list .l_filter_category_link{
    padding-left: 20px;
    &::after{
        position: absolute;
        top: 0;
        left: 0;
        font-family: "iconfont"!important;
        content: "\e63c";
        font-size: 18px;
        width: 19px;
        height: 16px;
    }
}
.l_check_item .l_filter_category_link{
    &::after{
        content: "\e63e";
    }
}
.l_choose_commands{
    position: relative;
    text-align: center;
    background-color: #fff;
    font-size: 12px;
    color: #333;
    z-index: 1;
    .l_choose_command_button{
        display: inline-block;
        margin-top: -1px;
        padding: 0;
        width: 120px;
        height: 28px;
        line-height: 28px;
        border: 1px solid #dfdfdf;
        border-top-color: #fff;
        background-color: #fff;
        cursor: pointer;
    }
}
</style>
