# my-vue

> a vue.js project

## Build Setup

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

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 打包部署

``` base
# 设置版本为生产环境还是开发环境，生产环境：production  开发环境：development
--build/build.js  process.env.NODE_ENV = 'production'

# 设置生产环境资源路径，避免打包之后生产环境上的路径找不到
--config/index.js  build: {assetsPublicPath: './'}

# 设置版本号
package.json package-lock.json
```

## @vue/cli3.x
``` bash
--vue create name 创建
--npm run serve 运行
--npm run build 打包编译
```
