# vue项目开箱即用前后台框架

> 该项目是基于vue-cli4这个大版本搭建的环境。使用的是vue2这个大版本

## 技术栈
vue + vue-router + vuex + axios + element-ui

## 项目安装与部署

### 项目初始化
```
yarn
// or
npm install
```

### 项目运行
```
yarn dev
// or 
npm run dev
```

### 项目打包部署
```
yarn build
// or 
npm run build
```

## 项目目录结构
```
├── build (配置文件，无需修改)
├── config (配置文件，修改后会合并到build目录下)
├── index.html (html模板)
├── mock (模拟数据目录)
├── package.json
├── src
│   ├── App.vue
│   ├── api (api目录文件夹)
│   ├── assets (静态资源文件夹)
│   ├── components (自定义组件文件夹)
│   ├── layout (布局文件夹)
│   ├── main.js (入口文件)
│   ├── router (路由入口)
│   ├── store (全局缓存)
│   ├── theme (主题文件夹)
│   ├── utils (一些自定义的工具文件夹)
│   │   ├── auth.js (权限认证)
│   │   ├── request.js (axios封装文件)
│   │   ├── setting.js (用户级别的全局配置)
│   │   └── utils.js (自定义工具函数文件)
│   └── views (视图文件夹)
└── static (静态资源文件夹)
```

## 封装的组件
#### 1、表格组件——BaseTable.vue
```
// 属性
columns: 列名 Array
    prop: 列里要填入的表格字段 String
    label: 列显示的名字 String
    width: 列宽 number
    isTip: 该列是否开启溢出截断省略提示 Boolean，默认false
    isTag: 是否标记为tag Boolean，默认false
    type: tag类型 String 具体参见element的tag组件文档，isTag为true时生效，默认空
    btnArr: 是否操作列 Boolean，默认false
    fixed: 是否固定列 Boolean，默认false
tableData: 表格数据
isMark: 是否高亮第一行 Boolean，默认false
isMultiCheck: 是否开启多选 Boolean，默认true
isShowPages: 是否显示分页按钮 Boolean，默认true

// 事件
current-change: 当前页
selection-change: 多选数据
```

#### 2、树组件——BaseTree.vue
```
// 属性
treeData: 树的数据 Array
nodekey: 树节点的唯一标识 string
lazy: 是否支持懒加载 boolean 默认false
loading: 是否树在显示加载中 boolean 默认false
showCheckbox: 是否在节点前显示复选框 boolean 默认false
loadNode: 加载子树数据的方法，lazy为true时生效
defaultCheckedArr: 默认选中的节点数组 array
checkStrictly: 是否打断复选框父子节点不关联 boolean 默认false
defaultExpandedKeys: 默认展开的节点数组 array

// 事件
handleNodeClick: 当前节点被点击
```

## License

[MIT](https://github.com/webjunjun/vue-admin-light/blob/master/LICENSE)
