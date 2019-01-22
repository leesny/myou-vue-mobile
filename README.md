
# myou-vue-mobile

> 本模板工程为快速开发适配手机屏幕的网页而设计。
整合了Vue、vuetify、vuex等框架，能让开发者从搭建工程到发布做到开箱即用。

## [编码规范](/doc/开发规范.md)
> 统一的编码规范，可使代码更易于阅读，易于理解，易于维护。尽量按照ESLint格式要求编写代码，请仔细阅读开发规范文档...

## [踩坑日记](/doc/踩坑日记.md)
> 记录开发中踩坑的技术要点，问题集锦等

## 推荐编辑器
> [Visual Studio Code](https://code.visualstudio.com/)

## git提交信息规范
在提交代码时，应遵守以下规范：

+ 修改的文件如果涉及多个板块，应单独先提交。
+ 提交信息格式：
  - 页面或组件：新增/修改/删除页面名、组件名、utils文件名等（改动点），例如 发票信息页面（修改返回字段）。 SingleInput组件（扩展xxx功能，增加size属性用于设置输入框高度，默认为md [44px]，目前支持lg [54px]）
  - utils：新增/修改/删除文件名(改动点), 例如 新增util/initMap.js(增加xxx方法)
  - 接口：新增/修改/删除接口名， 例如 删除xxx接口
  - 框架文件：新增/修改/删除/优化/扩展等 功能点（扩展特性说明）  例如 新增scss支持（支持 scss 并兼容css-modules）

## 目录

- [文件结构](#文件结构)
- [可用的脚本](#可用的脚本)
- [自定义WebPack配置](#自定义配置)
- [提交代码自动格式化](#提交代码自动格式化)
- [异步加载组件](#异步加载组件)
- [CSS样式编写](#样式编写)
- [引入图片、文件等资源](#引入图片等资源)
- [添加自定义的环境变量](#添加自定义的环境变量)
- [调用接口](#调用接口)
- [在开发中使用https](#在开发中使用https)
- [应用第三方JS](#应用第三方JS)


## 文件结构
```
   基于Vue-cli脚手架的目录结构
   ├── index.html                      入口页面
   ├── build                           构建脚本目录
   │   ├── build-server.js                 运行本地构建服务器，可以访问构后的页面
   │   ├── build.js                        生产环境构建脚本
   │   ├── dev-client.js                   开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新
   │   ├── dev-server.js                   运行本地开发服务器
   │   ├── utils.js                        构建相关工具方法
   │   ├── webpack.base.conf.js            wabpack基础配置
   │   ├── webpack.dev.conf.js             wabpack开发环境配置
   │   └── webpack.prod.conf.js            wabpack生产环境配置
   ├── config                          项目配置
   │   ├── dev.env.js                      开发环境变量
   │   ├── index.js                        项目配置文件
   │   ├── prod.env.js                     生产环境变量
   │   └── test.env.js                     测试环境变量
   ├── mock                            mock数据目录
   │   └── hello.js
   ├── package.json                    npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
   ├── src                             项目源码目录    
   │   ├── main.js                         入口js文件
   │   ├── App.vue                         根组件
   │   ├── components                      公共组件目录
   │   |   ├── frame                           框架基础组件
   │   │   └── title.vue                       业务组件
   │   ├── assets                          资源目录，这里的资源会被wabpack构建
   │   │   ├── css                         公共样式文件目录
   │   │   ├── js                          公共js文件目录
   │   │   └── img                      图片存放目录
   │   ├── routes                          前端路由
   │   │   └── index.js
   │   ├── store                           应用级数据（state）
   │   │   └── index.js
   │   └── views                           页面目录
   │       ├── hello.vue
   │       └── notfound.vue
   ├── static                          纯静态资源，不会被wabpack构建。
   └── test                            测试文件目录（unit&e2e）
       └── unit                            单元测试
           ├── index.js                        入口脚本
           ├── karma.conf.js                   karma配置文件
           └── specs                           单测case目录
               └── Hello.spec.js
```

## 构建步骤

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 在开发中使用https

```
修改package.json中dev脚本命令，改为true即可
```