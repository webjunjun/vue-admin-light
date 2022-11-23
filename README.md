# vue项目开箱即用前后台框架

> 该项目是基于vue-cli5这个大版本搭建的环境。使用的是vue2这个大版本

## 技术栈
vue + vue-router + vuex + axios + element-ui  
支持scss和less两种css预处理器对css进行处理

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
├── .husky (git 钩子)
├── mock (模拟数据目录)
├── public (打包时的html模板等资源)
├── src
│   ├── api (api目录文件夹)
│   ├── assets (静态资源文件夹)
│   ├── components (自定义组件文件夹)
│   ├── directive (自定义指令)
│   ├── icons (svg组件)
│   ├── layout (布局文件夹)
│   ├── router (路由入口)
│   ├── store (全局缓存)
│   ├── theme (主题文件夹)
│   ├── utils (一些自定义的工具文件夹)
│   │   ├── auth.js (权限认证)
|   |   ├── nprogress.js (页面切换进度条动画)
│   │   ├── request.js (axios封装文件)
│   │   ├── setting.js (用户级别的全局配置)
|   |   ├── useComponent.js (注册自定义的全局组件)
│   │   └── utils.js (自定义工具函数文件)
|   ├── views (视图文件夹)
|   ├── App.vue
│   └── main.js (入口文件)
├── static (静态资源文件夹)
├── .editorconfig (设置一些在编辑器里的通用设置)
├── .eslintignore (eslint忽略检查的文件)
├── .eslintrc.js (eslint检查规则)
├── .gitignore (git提交忽略的文件)
├── .stylelintignore (stylelint忽略检查的文件)
├── .stylelintrc.js (stylelint检查规则)
├── babel.config.js (babel设置)
├── commitlint.config.js (git提交规范设置)
├── jsconfig.json (改善javascript的开发体验)
├── package.json
├── README.md
└── vue.config.js (项目配置)
```

## License

[MIT](https://github.com/webjunjun/vue-admin-light/blob/master/LICENSE)
