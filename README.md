# vue3项目开箱即用前后台框架
## 技术栈
vue + vue-router + pinia + axios + element-plus

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

## License

[MIT](https://github.com/webjunjun/vue-admin-light/blob/master/LICENSE)
