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


# 打包部署
进入build/build.js文件  设置process.env.NODE_ENV = 'production' // 生产环境：production  开发环境：development
进入config/index.js文件  设置build: {assetsPublicPath: './'} // 避免打包之后生产环境上的路径找不到
package.json package-lock.json  设置版本号
